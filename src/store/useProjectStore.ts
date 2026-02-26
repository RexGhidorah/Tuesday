import { create } from 'zustand';
import type { Column, Task, Status, Workspace, User, Activity } from '../types';
import axios from '../api/axios';

interface ProjectState {
  columns: Column[];
  workspaces: Workspace[];
  activeWorkspaceId: string;
  selectedTaskId: string | null;
  currentUser: User | null;
  users: User[];
  activities: Activity[];

  // New: Loading state
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchData: (orgId: string) => Promise<void>;

  moveTask: (taskId: string, newStatus: Status, orgId: string) => Promise<void>;
  addTask: (status: Status, task: Partial<Task>, orgId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  setSelectedTask: (taskId: string | null) => void;

  // Workspace Actions
  addWorkspace: (name: string, color: string) => void;
  deleteWorkspace: (id: string) => void;
  setActiveWorkspace: (id: string) => void;

  // Activity Actions
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;

  setCurrentUser: (user: User) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  columns: [],
  workspaces: [],
  activeWorkspaceId: '',
  selectedTaskId: null,
  currentUser: null,
  users: [],
  activities: [],
  isLoading: false,
  error: null,

  setCurrentUser: (user) => set({ currentUser: user }),

  fetchData: async (orgId) => {
      set({ isLoading: true, error: null });
      try {
          const res = await axios.get(`/data/${orgId}`);
          set({
              workspaces: res.data.workspaces,
              columns: res.data.columns,
              users: res.data.users,
              activities: res.data.activities,
              activeWorkspaceId: res.data.workspaces[0]?.id || '',
              isLoading: false
          });
      } catch (err: any) {
          set({ isLoading: false, error: err.message });
      }
  },

  moveTask: async (taskId, newStatus, orgId) => {
    // Optimistic Update
    const state = get();
    const previousColumns = state.columns;

    // Find task and source column
    let taskToMove: Task | undefined;
    let sourceColId: Status | undefined;

    for (const col of state.columns) {
        const t = col.items.find(i => i.id === taskId);
        if (t) {
            taskToMove = t;
            sourceColId = col.id as Status; // Assuming col.id matches status
            break;
        }
    }

    if (!taskToMove || !sourceColId || sourceColId === newStatus) return;

    const newColumns = state.columns.map(col => {
        if (col.id === sourceColId) {
            return { ...col, items: col.items.filter(t => t.id !== taskId) };
        }
        if (col.id === newStatus) {
            return { ...col, items: [...col.items, { ...taskToMove!, status: newStatus }] };
        }
        return col;
    });

    set({ columns: newColumns });

    try {
        await axios.put(`/tasks/${taskId}/move`, { newStatus, organization_id: orgId });
    } catch (err) {
        // Revert on failure
        console.error("Failed to move task", err);
        set({ columns: previousColumns });
    }
  },

  addTask: async (status, task, orgId) => {
      try {
          // Prepare payload, converting assignees to IDs
          const payload = {
              ...task,
              status_id: status,
              organization_id: orgId,
              assignees: task.assignees?.map(u => u.id) || []
          };

          const res = await axios.post('/tasks', payload);

          const newTask = { ...task, id: res.data.id, status, assignees: task.assignees || [], tags: [] } as Task;

          set(state => ({
              columns: state.columns.map(col => {
                  if (col.id === status) {
                      return { ...col, items: [...col.items, newTask] };
                  }
                  return col;
              })
          }));

           const newActivity: Activity = {
              id: 'temp-' + Date.now(),
              type: 'create_task',
              user: get().currentUser!,
              taskId: newTask.id,
              taskTitle: newTask.title,
              timestamp: new Date().toISOString(),
            };
            set(state => ({ activities: [newActivity, ...state.activities] }));

      } catch (err) {
          console.error("Failed to add task", err);
      }
  },

  deleteTask: async (taskId) => {
    // TODO: Implement backend delete
    set((state) => {
      const newColumns = state.columns.map(col => ({
        ...col,
        items: col.items.filter(t => t.id !== taskId)
      }));
      return { columns: newColumns };
    });
  },

  setSelectedTask: (taskId) => set({ selectedTaskId: taskId }),

  updateTask: async (taskId, updates) => {
      // TODO: Implement backend update
    set((state) => {
        // First check if status changed, if so we need to use move logic roughly (but moveTask handles api call differently)
        // If status changed here, we should probably call moveTask or handle it.
        // For now, let's just update properties in place (assuming no status change via this generic updateTask for now)

        const newColumns = state.columns.map(col => ({
          ...col,
          items: col.items.map(task =>
            task.id === taskId ? { ...task, ...updates } : task
          )
        }));
        return { columns: newColumns };
    });
  },

  // Workspace Actions (Optimistic / Local for now, need backend impl)
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
    activeWorkspaceId: state.activeWorkspaceId === id ? state.workspaces[0]?.id : state.activeWorkspaceId
  })),

  setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),

  addActivity: (activity) => set((state) => ({
    activities: [{
        ...activity,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
    }, ...state.activities]
  }))
}));
