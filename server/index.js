const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// Middleware
app.use(cors());
app.use(express.json());

// Database Setup
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database ' + dbPath + ': ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

// Initialize Database Tables
function initializeDatabase() {
    db.serialize(() => {
        // Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE,
            password TEXT,
            name TEXT,
            avatar_url TEXT,
            role TEXT DEFAULT 'Member',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Organizations Table
        db.run(`CREATE TABLE IF NOT EXISTS organizations (
            id TEXT PRIMARY KEY,
            name TEXT,
            owner_id TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(owner_id) REFERENCES users(id)
        )`);

        // Organization Members Table (Many-to-Many)
        db.run(`CREATE TABLE IF NOT EXISTS organization_members (
            user_id TEXT,
            organization_id TEXT,
            role TEXT DEFAULT 'Member',
            joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id, organization_id),
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(organization_id) REFERENCES organizations(id)
        )`);

        // Workspaces Table
        db.run(`CREATE TABLE IF NOT EXISTS workspaces (
            id TEXT PRIMARY KEY,
            organization_id TEXT,
            name TEXT,
            color TEXT,
            icon TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(organization_id) REFERENCES organizations(id)
        )`);

        // Columns Table (Statuses)
        db.run(`CREATE TABLE IF NOT EXISTS columns (
            id TEXT PRIMARY KEY,
            organization_id TEXT,
            title TEXT,
            color_class TEXT,
            "order" INTEGER,
            FOREIGN KEY(organization_id) REFERENCES organizations(id)
        )`);

        // Tasks Table
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            organization_id TEXT,
            workspace_id TEXT,
            title TEXT,
            status_id TEXT,
            description TEXT,
            date TEXT,
            is_overdue BOOLEAN DEFAULT 0,
            cover_image TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(organization_id) REFERENCES organizations(id),
            FOREIGN KEY(workspace_id) REFERENCES workspaces(id),
            FOREIGN KEY(status_id) REFERENCES columns(id)
        )`);

        // Task Assignees (Many-to-Many)
        db.run(`CREATE TABLE IF NOT EXISTS task_assignees (
            task_id TEXT,
            user_id TEXT,
            PRIMARY KEY (task_id, user_id),
            FOREIGN KEY(task_id) REFERENCES tasks(id),
            FOREIGN KEY(user_id) REFERENCES users(id)
        )`);

        // Task Tags (Simple string storage for now or separate table)
        db.run(`CREATE TABLE IF NOT EXISTS tags (
            id TEXT PRIMARY KEY,
            organization_id TEXT,
            name TEXT,
            color TEXT,
            text_color TEXT,
            FOREIGN KEY(organization_id) REFERENCES organizations(id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS task_tags (
            task_id TEXT,
            tag_id TEXT,
            PRIMARY KEY (task_id, tag_id),
            FOREIGN KEY(task_id) REFERENCES tasks(id),
            FOREIGN KEY(tag_id) REFERENCES tags(id)
        )`);

        // Activities Table
        db.run(`CREATE TABLE IF NOT EXISTS activities (
            id TEXT PRIMARY KEY,
            organization_id TEXT,
            type TEXT,
            user_id TEXT,
            task_id TEXT,
            task_title TEXT,
            details TEXT,
            meta TEXT, -- JSON string for extra data like oldStatus, newStatus
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(organization_id) REFERENCES organizations(id),
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(task_id) REFERENCES tasks(id)
        )`);

        console.log("Database tables initialized.");
    });
}

// Helper to wrap db.run in promise
const run = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
};

// Helper to wrap db.get in promise
const get = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// Helper to wrap db.all in promise
const all = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};


// --- AUTH MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- ROUTES ---

// 1. Register
app.post('/api/auth/register', async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) return res.status(400).json({ error: 'Missing fields' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = 'u-' + Math.random().toString(36).substr(2, 9);

        await run('INSERT INTO users (id, email, password, name, avatar_url) VALUES (?, ?, ?, ?, ?)',
            [userId, email, hashedPassword, name, '']);

        const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: userId, email, name, avatarUrl: '' } });
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: err.message });
    }
});

// 2. Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) return res.status(400).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

        // Fetch user's organizations
        const organizations = await all(`
            SELECT o.*, om.role as user_role
            FROM organizations o
            JOIN organization_members om ON o.id = om.organization_id
            WHERE om.user_id = ?
        `, [user.id]);

        res.json({
            token,
            user: { id: user.id, email: user.email, name: user.name, avatarUrl: user.avatar_url },
            organizations
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Me (Verify Token)
app.get('/api/auth/me', authenticateToken, async (req, res) => {
    try {
        const user = await get('SELECT * FROM users WHERE id = ?', [req.user.id]);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Fetch user's organizations
        const organizations = await all(`
            SELECT o.*, om.role as user_role
            FROM organizations o
            JOIN organization_members om ON o.id = om.organization_id
            WHERE om.user_id = ?
        `, [user.id]);

        res.json({
            user: { id: user.id, email: user.email, name: user.name, avatarUrl: user.avatar_url },
            organizations
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Create Organization (Onboarding)
app.post('/api/organizations', authenticateToken, async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;
    const orgId = 'org-' + Math.random().toString(36).substr(2, 9);

    try {
        // Create Org
        await run('INSERT INTO organizations (id, name, owner_id) VALUES (?, ?, ?)', [orgId, name, userId]);

        // Add User as Member (Owner)
        await run('INSERT INTO organization_members (user_id, organization_id, role) VALUES (?, ?, ?)', [userId, orgId, 'Owner']);

        // Create Default Workspace
        const wsId = 'ws-' + Math.random().toString(36).substr(2, 9);
        await run('INSERT INTO workspaces (id, organization_id, name, color, icon) VALUES (?, ?, ?, ?, ?)',
            [wsId, orgId, 'Main Workspace', 'bg-primary', 'table_chart']);

        // Create Default Columns
        const defaultCols = [
            { id: 'working', title: 'Working on it', color: 'bg-warning' },
            { id: 'stuck', title: 'Stuck', color: 'bg-error' },
            { id: 'done', title: 'Done', color: 'bg-success' },
            { id: 'backlog', title: 'Backlog', color: 'bg-info' }
        ];

        for (const col of defaultCols) {
            // We use simple IDs for columns but scoped to org if needed.
            // For now, let's keep it simple: id is just the status string (working, stuck, etc)
            // But this will conflict if multiple orgs use same ID in `columns` table if ID is PK.
            // So ID must be unique.
             await run('INSERT INTO columns (id, organization_id, title, color_class, "order") VALUES (?, ?, ?, ?, ?)',
                [col.id + '-' + orgId, orgId, col.title, col.color, 0]);
        }

        res.json({ id: orgId, name, role: 'Owner' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Get Project Data (Initial Load)
app.get('/api/data/:orgId', authenticateToken, async (req, res) => {
    const { orgId } = req.params;
    const userId = req.user.id;

    try {
        // Verify Membership
        const member = await get('SELECT * FROM organization_members WHERE user_id = ? AND organization_id = ?', [userId, orgId]);
        if (!member) return res.status(403).json({ error: 'Not a member of this organization' });

        // Fetch Workspaces
        const workspaces = await all('SELECT * FROM workspaces WHERE organization_id = ?', [orgId]);

        // Fetch Columns
        const columns = await all('SELECT * FROM columns WHERE organization_id = ?', [orgId]);

        // Fetch Tasks
        const tasks = await all('SELECT * FROM tasks WHERE organization_id = ?', [orgId]);

        // Fetch Tags
        const tags = await all('SELECT * FROM tags WHERE organization_id = ?', [orgId]);

        // Fetch Activities
        const activities = await all('SELECT * FROM activities WHERE organization_id = ? ORDER BY timestamp DESC LIMIT 50', [orgId]);

        // Fetch Users in Org
        const users = await all(`
            SELECT u.id, u.name, u.email, u.avatar_url, om.role
            FROM users u
            JOIN organization_members om ON u.id = om.user_id
            WHERE om.organization_id = ?
        `, [orgId]);

        // Need to attach assignees and tags to tasks
        // This is N+1, but for MVP/SQLite it's fine. Optimize later with JOIN if needed.
        const tasksWithDetails = await Promise.all(tasks.map(async (task) => {
            const assignees = await all(`
                SELECT u.id, u.name, u.avatar_url
                FROM users u
                JOIN task_assignees ta ON u.id = ta.user_id
                WHERE ta.task_id = ?
            `, [task.id]);

            const taskTags = await all(`
                SELECT t.*
                FROM tags t
                JOIN task_tags tt ON t.id = tt.tag_id
                WHERE tt.task_id = ?
            `, [task.id]);

            return {
                ...task,
                isOverdue: !!task.is_overdue, // Convert sqlite 0/1 to boolean
                assignees,
                tags: taskTags
            };
        }));

        // Format columns to include items
        const columnsWithItems = columns.map(col => ({
            ...col,
            // Extract the simple ID part (e.g. 'working-org123' -> 'working') for frontend compatibility if needed
            // BUT frontend expects unique IDs for dnd-kit. Let's use the DB ID.
            // However, the initialTasks in frontend uses 'working' etc.
            // We need to make sure frontend can handle these new IDs.
            items: tasksWithDetails.filter(t => t.status_id === col.id)
        }));

        res.json({
            workspaces,
            columns: columnsWithItems,
            tasks: tasksWithDetails,
            users,
            activities: activities.map(a => ({...a, meta: a.meta ? JSON.parse(a.meta) : {}}))
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// --- DATA MODIFICATION ENDPOINTS ---

// Add Task
app.post('/api/tasks', authenticateToken, async (req, res) => {
    const { organization_id, title, status_id, workspace_id, date, assignees } = req.body;
    // assignees is array of userIds

    try {
        const id = 'task-' + Math.random().toString(36).substr(2, 9);
        await run(`INSERT INTO tasks (id, organization_id, workspace_id, title, status_id, date)
                   VALUES (?, ?, ?, ?, ?, ?)`,
                   [id, organization_id, workspace_id || null, title, status_id, date]);

        if (assignees && assignees.length > 0) {
            for (const userId of assignees) {
                await run('INSERT INTO task_assignees (task_id, user_id) VALUES (?, ?)', [id, userId]);
            }
        }

        // Log Activity
        const actId = 'act-' + Math.random().toString(36).substr(2, 9);
        await run(`INSERT INTO activities (id, organization_id, type, user_id, task_id, task_title)
                   VALUES (?, ?, ?, ?, ?, ?)`,
                   [actId, organization_id, 'create_task', req.user.id, id, title]);

        res.json({ id, title, status_id, date });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Move Task (Update Status)
app.put('/api/tasks/:taskId/move', authenticateToken, async (req, res) => {
    const { taskId } = req.params;
    const { newStatus, organization_id } = req.body; // newStatus is the column ID

    try {
        // Get old status for activity log
        const task = await get('SELECT * FROM tasks WHERE id = ?', [taskId]);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        await run('UPDATE tasks SET status_id = ? WHERE id = ?', [newStatus, taskId]);

        // Log Activity
        const actId = 'act-' + Math.random().toString(36).substr(2, 9);
        const meta = JSON.stringify({ oldStatus: task.status_id, newStatus: newStatus });

        await run(`INSERT INTO activities (id, organization_id, type, user_id, task_id, task_title, meta)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`,
                   [actId, organization_id, 'status_change', req.user.id, taskId, task.title, meta]);

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
