export type Status = 'working' | 'stuck' | 'done' | 'backlog';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
  status?: 'active' | 'inactive';
}

export interface Organization {
    id: string;
    name: string;
    role: string; // User's role in this org
}

export interface Tag {
  id: string;
  name: string;
  color: string; // Tailwind class or hex
  textColor: string; // Tailwind class or hex
}

export interface Task {
  id: string;
  title: string;
  status: Status; // This might need to be string if we allow dynamic statuses from DB
  assignees: User[];
  date?: string;
  tags: Tag[];
  coverImage?: string;
  isOverdue?: boolean;
  description?: string;
}

export interface Column {
  id: Status; // or string
  title: string;
  colorClass: string; // e.g., 'bg-warning'
  items: Task[];
}

export interface Workspace {
  id: string;
  name: string;
  color: string; // e.g., 'bg-primary'
  icon?: string; // Material symbol name
}

export type ActivityType = 'status_change' | 'comment' | 'create_task' | 'upload_file' | 'add_member' | 'mention';

export interface Activity {
  id: string;
  type: ActivityType;
  user: User;
  taskId?: string; // If related to a task
  taskTitle?: string; // Snapshot of task title
  timestamp: string; // ISO string
  details?: string; // For comments or extra info
  meta?: any; // E.g., oldStatus, newStatus, fileName, etc.
}
