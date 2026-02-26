export type Status = 'working' | 'stuck' | 'done' | 'backlog';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
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
  status: Status;
  assignees: User[];
  date?: string;
  tags: Tag[];
  coverImage?: string;
  isOverdue?: boolean;
}

export interface Column {
  id: Status;
  title: string;
  colorClass: string; // e.g., 'bg-warning'
  items: Task[];
}
