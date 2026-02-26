import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Column, Task, Status, Workspace, User, Activity } from '../types';

interface ProjectState {
  columns: Column[];
  workspaces: Workspace[];
  activeWorkspaceId: string;
  selectedTaskId: string | null;
  currentUser: User;
  users: User[];
  activities: Activity[];

  // Actions
  moveTask: (taskId: string, newStatus: Status) => void;
  addTask: (status: Status, task: Task) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  setSelectedTask: (taskId: string | null) => void;

  // Workspace Actions
  addWorkspace: (name: string, color: string) => void;
  deleteWorkspace: (id: string) => void;
  setActiveWorkspace: (id: string) => void;

  // Activity Actions
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
}

const initialUsers: User[] = [
  { id: 'u0', name: 'Alex Rivera', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA424q6VgzDxL7UxKmYnaaUGZfRRQJhlU8ndVmU5wfRab5DgjIGjvyE6ATuKRTSKXPm0H4aqLy2PlSghmmZIfl7RKTf3Q8md_okVINDRlGrST4AXZLcFNuWjDrv3yEJT2fsfbQP9VQQBrTaICAHssprgs70S2IX6oOLTKU2LxKh3me1i7NhHRK4aDnhxukrkyHefaK88TulAx7DVrrZKTV6E8iZEwPKwVrVbZLueE4nTL5a7ECd2wSbnxN7_4JC7neQzmw2f8wfe7Tm', role: 'Admin', email: 'alex@tuesday.com', status: 'active' },
  { id: 'u1', name: 'Sarah Chen', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7KSYzJWKETBLM-_6BHOzusyoNO5mSFIyr-sEpIC6HBxoXS00yEiU7Udxn9gIwsxSp85kHNVkwSEOVcnOhBTiz9b6cW5tkH_8cnDBKvPcM6soORXvNM21atIbnig8BdK6T4Mgnt0wNrnKosl77SfneRwhhggF7eFgkSqOVorIXTryA2rvzKrO9K4-2ChD-48T6GBt_2aSwNy-ufDkaj7UcFyTVpTZZedJJBbdyJdstaccvJD6YkUmX0aic6zAvoO9HJnmnNh8uRVPI', role: 'Member', email: 'sarah@tuesday.com', status: 'active' },
  { id: 'u2', name: 'Mike Ross', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2P05KeogtoDnY8wCEqxmE8GnHX_ySvmw5ucvcvOAq5ghCSzWcNsBWHbc_0ADwU31mv9CT3J-UufVD_L2shN8vfjiXplEOFbFVUB0wMcmStOrh9fXsluDlM6VYU_dvOvf4MYwJa8eRFp250Rhxy5NclirgLmf9O4s7epcGzqvFXEARu2RSU16nCN-MVRwnwdlYB3CdNoMQzB_wXuCsoAXgeWLjejx_xvrhDhthpD3gWKsE82ktvQfEFgFpeAiMiWdUPQTZH7KppTFy', role: 'Viewer', email: 'mike@tuesday.com', status: 'active' },
  { id: 'u3', name: 'Jessica Pearson', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD48kKf5hh2iEo46IXyQ0VAaH0meNbo7MERzbwBX9t3s6YI1QwHBQfbfuP9FiHeDSw6zdVXrTbOj3z-0HpUr46MGCNPtVE85_OR-FJpKe0yS9YtXb9wg3vAv8kRCmEXsY2umRPfM-5yCLp2CfxdVcUxof7uEgbRRXrXxk1ZT2mTAegUIn5Q_Y2LI8byLMQlf2pxI4OqYchr81ZJxPe9N8p5IXmzxvzPssbOgqc9EdqXDuLZrhAWZDbcWCKht21-CaNjYyXEwzmwz7NU', role: 'Admin', email: 'jessica@tuesday.com', status: 'active' },
  { id: 'u4', name: 'Harvey Specter', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB00oOFrkkDvwcM5gjQfDV0vXGOZ0jRslz_1WbKEGLzAvYfInQjGBiogsee_cNJB-nwHGIcPrRlhyq5uGYF55o3P9_mEbIHLItGl0znqyupWRNx7Tsu4ZM1z5Y21nEUZuBFrZcWFSfTajHyNNWMELxrBVy2s46GabAB6ugdpTOdpeQf7u6NaqKmyg4u-zt8WcczIjbM-4g6Aabo2p9OE_Wb6PZQxgS4ApoLKgH1WF7aJlskckIk0oFdvsDLl0TYLFgS73nECmWfpsND', role: 'Member', email: 'harvey@tuesday.com', status: 'active' },
];

const initialTasks: Task[] = [
  // Working on it
  {
    id: '1',
    title: 'Homepage Hero Interaction',
    status: 'working',
    tags: [{ id: 't1', name: 'Design', color: 'bg-[#E5D4FF]', textColor: 'text-[#594EE6]' }],
    date: 'Today',
    assignees: [initialUsers[0]], // Alex
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsXT-1AjGiaE2JqQ9akKlFdrabSyq0h0UIc0qmKRrfgaoZOID4KFatnWjVYkhR5MCm8iJNafsy4WtLgXdBvkeswHjznPrOFYGZmx8VbElFq7LuL3jV6v7Pib9bH1IySDJ42FGSmpmrq_UA517ZpXwObH547QyFSG2C92Q7aieJEQ-NFmSRtlvEnPDEbMVdw4ZNnNjRuF-7e6sjjnXLdoxbDXKTkkb6vdHzHQB-SPSXnVVIdklO4vPLLk_51SrKAQToVtq1Mblwy3rK'
  },
  {
    id: '2',
    title: 'Implement Auth0 Login Flow',
    status: 'working',
    tags: [{ id: 't2', name: 'Dev', color: 'bg-[#E3F2FD]', textColor: 'text-[#1565C0]' }],
    date: 'Oct 24',
    assignees: [initialUsers[1], initialUsers[2]] // Sarah, Mike
  },
  {
    id: '3',
    title: "Draft 'About Us' Story",
    status: 'working',
    tags: [{ id: 't3', name: 'Copy', color: 'bg-surface', textColor: 'text-muted' }],
    date: 'Oct 25',
    assignees: [initialUsers[3]] // Jessica
  },
  // Stuck
  {
    id: '4',
    title: 'API Response Latency Fix',
    status: 'stuck',
    tags: [{ id: 't2', name: 'Backend', color: 'bg-[#E3F2FD]', textColor: 'text-[#1565C0]' }],
    date: 'Overdue',
    isOverdue: true,
    assignees: [initialUsers[0], initialUsers[4]] // Alex, Harvey
  },
  // Done
  {
    id: '5',
    title: 'Setup Git Repository',
    status: 'done',
    tags: [{ id: 't4', name: 'Infra', color: 'bg-[#E3F2FD]', textColor: 'text-[#1565C0]' }],
    date: 'Oct 15',
    assignees: [initialUsers[1]] // Sarah
  },
  {
    id: '6',
    title: 'Logo Revisions',
    status: 'done',
    tags: [{ id: 't1', name: 'Design', color: 'bg-[#E5D4FF]', textColor: 'text-[#594EE6]' }],
    date: 'Oct 12',
    assignees: [initialUsers[2]] // Mike
  },
  // Backlog
  {
    id: '7',
    title: 'Mobile Responsiveness Audit',
    status: 'backlog',
    tags: [{ id: 't5', name: 'Strategy', color: 'bg-surface', textColor: 'text-muted' }],
    date: 'TBD',
    assignees: []
  },
  {
    id: '8',
    title: 'Privacy Policy Update',
    status: 'backlog',
    tags: [{ id: 't6', name: 'Legal', color: 'bg-surface', textColor: 'text-muted' }],
    date: 'Nov 01',
    assignees: [initialUsers[3]] // Jessica
  }
];

const initialColumns: Column[] = [
  { id: 'working', title: 'Working on it', colorClass: 'bg-warning', items: [] },
  { id: 'stuck', title: 'Stuck', colorClass: 'bg-error', items: [] },
  { id: 'done', title: 'Done', colorClass: 'bg-success', items: [] },
  { id: 'backlog', title: 'Backlog', colorClass: 'bg-info', items: [] },
];

const initialWorkspaces: Workspace[] = [
  { id: 'ws-main', name: 'Main Table', color: 'bg-primary', icon: 'table_chart' },
  { id: 'ws-kanban', name: 'Kanban', color: 'bg-surface', icon: 'view_kanban' },
  { id: 'ws-gantt', name: 'Gantt', color: 'bg-surface', icon: 'waterfall_chart' },
  { id: 'ws-calendar', name: 'Calendar', color: 'bg-surface', icon: 'calendar_month' },
];

const populateColumns = (tasks: Task[], columns: Column[]): Column[] => {
  return columns.map(col => ({
    ...col,
    items: tasks.filter(task => task.status === col.id)
  }));
};

const initialActivities: Activity[] = [
  {
    id: 'act-1',
    type: 'status_change',
    user: initialUsers[1], // Sarah
    taskId: '5',
    taskTitle: 'Setup Git Repository',
    timestamp: new Date(new Date().setHours(10, 42)).toISOString(),
    meta: { oldStatus: 'working', newStatus: 'done' }
  },
  {
    id: 'act-2',
    type: 'comment',
    user: initialUsers[0], // Alex
    taskId: '2',
    taskTitle: 'Implement Auth0 Login Flow',
    timestamp: new Date(new Date().setHours(9, 15)).toISOString(),
    details: "We need to check the rate limits before merging the new endpoints. I'm seeing some 429 errors in staging."
  },
  {
    id: 'act-3',
    type: 'create_task',
    user: { id: 'bot', name: 'Tuesday Bot', avatarUrl: '', role: 'Bot' } as User,
    taskTitle: 'Q4 Budgeting',
    timestamp: new Date(new Date().setHours(8, 0)).toISOString(),
  },
  {
    id: 'act-4',
    type: 'upload_file',
    user: initialUsers[2], // Mike
    taskId: '1',
    taskTitle: 'Homepage Hero Interaction',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // Yesterday
    details: 'wireframes_v2.fig',
  },
  {
    id: 'act-5',
    type: 'mention',
    user: initialUsers[3], // Jessica
    taskId: '8',
    taskTitle: 'Privacy Policy Update',
    timestamp: new Date(new Date().setHours(14, 15)).toISOString(),
    details: 'added Sarah Chen to the team'
  },
  {
    id: 'act-6',
    type: 'status_change',
    user: initialUsers[4], // Harvey
    taskId: '4',
    taskTitle: 'API Response Latency Fix',
    timestamp: new Date(new Date().setHours(11, 0)).toISOString(),
    meta: { oldStatus: 'working', newStatus: 'stuck' }
  }
];

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      columns: populateColumns(initialTasks, initialColumns),
      workspaces: initialWorkspaces,
      activeWorkspaceId: 'ws-main',
      selectedTaskId: null,
      currentUser: initialUsers[0], // Alex Rivera is default
      users: initialUsers,
      activities: initialActivities,

      moveTask: (taskId, newStatus) => set((state) => {
        let taskToMove: Task | undefined;
        let sourceColId: Status | undefined;

        for (const col of state.columns) {
          const task = col.items.find(t => t.id === taskId);
          if (task) {
            taskToMove = task;
            sourceColId = col.id;
            break;
          }
        }

        if (!taskToMove || !sourceColId) return {};
        if (sourceColId === newStatus) return {};

        const newColumns = state.columns.map(col => {
          if (col.id === sourceColId) {
            return {
              ...col,
              items: col.items.filter(t => t.id !== taskId)
            };
          }
          if (col.id === newStatus) {
            return {
              ...col,
              items: [...col.items, { ...taskToMove!, status: newStatus }]
            };
          }
          return col;
        });

        // Log Activity
        const newActivity: Activity = {
          id: Math.random().toString(36).substr(2, 9),
          type: 'status_change',
          user: state.currentUser,
          taskId: taskToMove.id,
          taskTitle: taskToMove.title,
          timestamp: new Date().toISOString(),
          meta: { oldStatus: sourceColId, newStatus: newStatus }
        };

        return { columns: newColumns, activities: [newActivity, ...state.activities] };
      }),

      addTask: (status, task) => set((state) => {
        const newColumns = state.columns.map(col => {
          if (col.id === status) {
            return { ...col, items: [...col.items, task] };
          }
          return col;
        });

        // Log Activity
        const newActivity: Activity = {
          id: Math.random().toString(36).substr(2, 9),
          type: 'create_task',
          user: state.currentUser,
          taskId: task.id,
          taskTitle: task.title,
          timestamp: new Date().toISOString(),
        };

        return { columns: newColumns, activities: [newActivity, ...state.activities] };
      }),

      deleteTask: (taskId) => set((state) => {
        const newColumns = state.columns.map(col => ({
          ...col,
          items: col.items.filter(t => t.id !== taskId)
        }));
        return { columns: newColumns };
      }),

      setSelectedTask: (taskId) => set({ selectedTaskId: taskId }),

      updateTask: (taskId, updates) => set((state) => {
        // First check if status changed, if so we need to use move logic roughly
        if (updates.status) {
           // Find task
           let currentTask: Task | undefined;
           for(const col of state.columns) {
             const found = col.items.find(t => t.id === taskId);
             if(found) { currentTask = found; break; }
           }

           if(currentTask && currentTask.status !== updates.status) {
             // Log Activity for status change
             const newActivity: Activity = {
                id: Math.random().toString(36).substr(2, 9),
                type: 'status_change',
                user: state.currentUser,
                taskId: currentTask.id,
                taskTitle: currentTask.title,
                timestamp: new Date().toISOString(),
                meta: { oldStatus: currentTask.status, newStatus: updates.status }
             };

             // Remove from old
             const colsAfterRemove = state.columns.map(c => ({
                ...c,
                items: c.items.filter(t => t.id !== taskId)
             }));
             // Add to new with updates
             const colsAfterAdd = colsAfterRemove.map(c => {
                if (c.id === updates.status) {
                    return { ...c, items: [...c.items, { ...currentTask!, ...updates }] };
                }
                return c;
             });
             return { columns: colsAfterAdd, activities: [newActivity, ...state.activities] };
           }
        }

        // Just update in place
        const newColumns = state.columns.map(col => ({
          ...col,
          items: col.items.map(task =>
            task.id === taskId ? { ...task, ...updates } : task
          )
        }));
        return { columns: newColumns };
      }),

      // Workspace Actions
      addWorkspace: (name, color) => set((state) => ({
        workspaces: [
          ...state.workspaces,
          {
            id: Math.random().toString(36).substr(2, 9),
            name,
            color,
            icon: 'table_chart'
          }
        ]
      })),

      deleteWorkspace: (id) => set((state) => ({
        workspaces: state.workspaces.filter(w => w.id !== id),
        activeWorkspaceId: state.activeWorkspaceId === id ? state.workspaces[0].id : state.activeWorkspaceId
      })),

      setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),

      addActivity: (activity) => set((state) => ({
        activities: [{
            ...activity,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
        }, ...state.activities]
      }))
    }),
    {
      name: 'project-storage',
    }
  )
);
