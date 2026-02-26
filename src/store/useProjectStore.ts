import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Column, Task, Status } from '../types';

interface ProjectState {
  columns: Column[];
  moveTask: (taskId: string, newStatus: Status) => void;
  addTask: (status: Status, task: Task) => void;
  deleteTask: (taskId: string) => void;
  setColumns: (columns: Column[]) => void;
  selectedTaskId: string | null;
  setSelectedTask: (taskId: string | null) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
}

const initialTasks: Task[] = [
  // Working on it
  {
    id: '1',
    title: 'Homepage Hero Interaction',
    status: 'working',
    tags: [{ id: 't1', name: 'Design', color: 'bg-[#E5D4FF]', textColor: 'text-[#594EE6]' }],
    date: 'Today',
    assignees: [{ id: 'u1', name: 'User 1', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlUmVUvykiJbKXTcXyaJ0zC4NNfEJBHa9Wv_f4r-QIluLDhF08sGHg3WgbSoHDkJsAKGe5nRKid2OHNZQJRGDajoFMBEPGMZ_IBgd8ehPTXXVZZ-qrq6X7tWs_KTGLVJ4RPjQD7zl-KemzzWlEDSh55p5C5hc7C0S53y8rXntffWYHUO0mdIFoc3RGvruOcsgELZYG9u9VrpUXtWlEo2jBpgiOwnoJydH3Nm_Qh_7BKHii-eVtJbpxHxqqWUj2T8nzPfiDX-etxXK9' }],
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsXT-1AjGiaE2JqQ9akKlFdrabSyq0h0UIc0qmKRrfgaoZOID4KFatnWjVYkhR5MCm8iJNafsy4WtLgXdBvkeswHjznPrOFYGZmx8VbElFq7LuL3jV6v7Pib9bH1IySDJ42FGSmpmrq_UA517ZpXwObH547QyFSG2C92Q7aieJEQ-NFmSRtlvEnPDEbMVdw4ZNnNjRuF-7e6sjjnXLdoxbDXKTkkb6vdHzHQB-SPSXnVVIdklO4vPLLk_51SrKAQToVtq1Mblwy3rK'
  },
  {
    id: '2',
    title: 'Implement Auth0 Login Flow',
    status: 'working',
    tags: [{ id: 't2', name: 'Dev', color: 'bg-[#E3F2FD]', textColor: 'text-[#1565C0]' }],
    date: 'Oct 24',
    assignees: [
      { id: 'u2', name: 'User 2', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb2Y_PVJqENb_zCVNdXOP6gBsCPNWD6-gKuj7tmWzrL5Z-Cf7rlAQ_b-F6uZ_HJPBSB1c6pTCn_L8aQH-fb0iUGqVbbBm_sUvKXhF5Df8wdZtIWXa6gBC9AUF-YjrKRBZgYGZjFgVayJ1Az41OYTePUhMsPhn_OAOzqb07slDag8SI3rcUZsQUqtcwIVytBz6NNtNVr6pFt5L6BznzAjLuHNpbaeYdhZmpbm7FMgyUEG6NTHj9nZmXxOsDeKc7FIYyrb78HSzyfHle' },
      { id: 'u3', name: 'User 3', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzJ9pH2IJ79s2x45UnOhn9yG-_GsreQ9VJ-uCInYSsMoZXw8567nbFCJEOSCVRbzxdN73SyFNgwMStKC-wh7I1YqQPytvdkRsGEQY-AjJdYfJWUeW4lLOlrvRBki7tEyQSm5J0ppUY6kupg45yesF1UZP4-JQhmULr_XtQy8mskWjh_lOYipA4-9HOG4vstXw0EQSEGOLS4uHPZ_ZIUuaaqnRl09TAWmUf-vjagr4TtPKjTCcn65adElBC5XBAjtC9MpvgLmi_Qs1K' }
    ]
  },
  {
    id: '3',
    title: "Draft 'About Us' Story",
    status: 'working',
    tags: [{ id: 't3', name: 'Copy', color: 'bg-surface', textColor: 'text-muted' }],
    date: 'Oct 25',
    assignees: [{ id: 'u4', name: 'User 4', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR7kvL1shMtwtaluuCDeNKGK6ZXwuuQnphPO_MGdUwDreQ-2kwemk1u0OYuGR_i0KU0fSDD_ABMKwFdSVdvr7bOiq4S4cET0PRvhjiwPEwgHgoKw2crM-cmbgA3gs19kVMM9ks1fyJ3hOjVr89UH5rb5A06J0JPYoJirZqI-qP-pvpEQg-Yrf0i3jO1w1ja7YVZgEps545WnJtjAGKaqp2nG6Nu0bEvkKTsPoO7Xbd0swvVLi3HbNTdKurERsXG0iQt3oxW4tZ1cct' }]
  },
  // Stuck
  {
    id: '4',
    title: 'API Response Latency Fix',
    status: 'stuck',
    tags: [{ id: 't2', name: 'Backend', color: 'bg-[#E3F2FD]', textColor: 'text-[#1565C0]' }],
    date: 'Overdue',
    isOverdue: true,
    assignees: [{ id: 'u5', name: 'User 5', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY8PB2Mx7qwVk2fsrYD5AOgVVsnw4tXz2prcmL9dZ3HBZJXvtmM2heE2B0qVyLEs1nJxFOBD799Jmz5EPcsK6AW9HFTDtE-QatIw3XFPlJEOe1znnu3_NXH-3tBoisA9rES_yqtDk1w-XZ11z1mOXY5z0QqnVy5cb9oMNp_O29jcCQDbKdsZujqiZLavAFCV-EdEInamAYF-Ajsbt8jeqkfC3ZeAieKMq9ZN2V1csY7mW-VCwNMd-83o-ses1_6F-E4KwDWHV68AvS' }]
  },
  // Done
  {
    id: '5',
    title: 'Setup Git Repository',
    status: 'done',
    tags: [{ id: 't4', name: 'Infra', color: 'bg-[#E3F2FD]', textColor: 'text-[#1565C0]' }],
    date: 'Oct 15',
    assignees: [{ id: 'u6', name: 'User 6', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOpoic3ei6KKHFukcKaTIj-RaqvQvP8uMC17SMssP21AVACjLyZZMX16g3TDBXRQpHwMmlKdzt8UBjpy1WF92wj0_roPhK_YHhTY8luZAyvkGSyZm_tBstTDZ-RbvzzdAPlsdIEhfqyDGGI_GrNhiXVSI2wabLOwOXpghbn2i-1cIapyzih6OZWEy4M9hCUsqNQpwXiIdvBFSXtcCaPzuzl29fW2Y8OHWcSeb6TR-eObyjhWN9IonogGla3RehtlgJi5W3YYKyIvI-' }],
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEhGyG9Vk9XcdXkbzAGELqkNTz42fjo7Xi4x7q0lNwPLFAGmWesrDRHdtJPR3lGDmcA2ATKuhCgFKhxjGXNARtClr52eXzPN9IImmiRFGkjNDc0VZA6TAtDwYZG2-a1DqACjJEGuIVvlRnqELimqUFJO5PHRauv1CWM1RQshyMehVaXRGcDdXyC-tkKu7g7ll3hUWEJupLxGXdGpjByExV-SyRSJSjUfHBn76fXgmmIuzJwzFCA_0nDNaqnVsKlHZuItrOcbrXl7_X'
  },
  {
    id: '6',
    title: 'Logo Revisions',
    status: 'done',
    tags: [{ id: 't1', name: 'Design', color: 'bg-[#E5D4FF]', textColor: 'text-[#594EE6]' }],
    date: 'Oct 12',
    assignees: [{ id: 'u7', name: 'User 7', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxzikj8xDfYkqunP3fzjU7h3eczI2h4M6F1GTgddxUv0DeycrDyRMsBJRthe7gS9QCB5MaHFMgO8UgnX10NIZ8FjcbZm2d022bYH16m4V4Xrviaip706shxbHwpxeu-P4WdB0qrhEsvRPbtZr65EIxUMVDfex3Mq5gfWkv2jwl9ksuzcVO1n2yernQgUnLWxlcTGTmjORHV90uLffNj4FdYofGA6hJQw7_9E5Yqjfkn3sS-xjm4kDykf1DyEk6B1KzPfWfkTny8_Un' }]
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
    assignees: [{ id: 'u8', name: 'User 8', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNZMUIu_lO6Y9prtwSG9CpicDvVDCUosMRyXl4FYJwD-JCpORtLiehcZ5pvYS15Uq802KHhmB4V6lH7ZD71CcLR6K1bcZypjbc6dWljrPJQNH9xucYeJxwC9mv66W7ZvRWbt5hgRRbfVFlAK6E-kXExe5hjmCAovCQi8pXdrDdBFt01TYD6833rwp9O1DBmgBU2CxaZkAk_LwrsshN9SsTD9cu6wolQORbTesypfqInCvaGFZbOuDtTHWEqJ6DuRs2k_hUPfByVU7E' }]
  }
];

const initialColumns: Column[] = [
  { id: 'working', title: 'Working on it', colorClass: 'bg-warning', items: [] },
  { id: 'stuck', title: 'Stuck', colorClass: 'bg-error', items: [] },
  { id: 'done', title: 'Done', colorClass: 'bg-success', items: [] },
  { id: 'backlog', title: 'Backlog', colorClass: 'bg-info', items: [] },
];

// Helper to populate columns from tasks
const populateColumns = (tasks: Task[], columns: Column[]): Column[] => {
  return columns.map(col => ({
    ...col,
    items: tasks.filter(task => task.status === col.id)
  }));
};

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      columns: populateColumns(initialTasks, initialColumns),

      moveTask: (taskId, newStatus) => set((state) => {
    // 1. Find the task and source column
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

    if (!taskToMove || !sourceColId) return {}; // Task not found

    if (sourceColId === newStatus) return {}; // No change needed

    // 2. Map columns to create new state (immutable update)
    const newColumns = state.columns.map(col => {
      // If this is the source column, remove the task
      if (col.id === sourceColId) {
        return {
          ...col,
          items: col.items.filter(t => t.id !== taskId)
        };
      }

      // If this is the destination column, add the task
      if (col.id === newStatus) {
        return {
          ...col,
          items: [...col.items, { ...taskToMove!, status: newStatus }]
        };
      }

      // Otherwise return as is
      return col;
    });

    return { columns: newColumns };
  }),

  addTask: (status, task) => set((state) => {
    const newColumns = state.columns.map(col => {
      if (col.id === status) {
        return { ...col, items: [...col.items, task] };
      }
      return col;
    });
    return { columns: newColumns };
  }),

  deleteTask: (taskId) => set((state) => {
    const newColumns = state.columns.map(col => ({
      ...col,
      items: col.items.filter(t => t.id !== taskId)
    }));
    return { columns: newColumns };
  }),

  setColumns: (columns) => set({ columns }),
  selectedTaskId: null,
  setSelectedTask: (taskId) => set({ selectedTaskId: taskId }),
  updateTask: (taskId, updates) => set((state) => {
    const newColumns = state.columns.map(col => ({
      ...col,
      items: col.items.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    }));
    // If status changed, we need to move the task (handle column change logic)
    // For simplicity, let's just update properties in place.
    // Moving logic is separate in moveTask but we could combine.
    // However, if status changes, the task should physically move columns.
    if (updates.status) {
       // This is complex because we need to remove from old col and add to new.
       // Let's defer to moveTask logic if status changes, or handle it here.
       // Re-using moveTask logic inside updateTask:
       const task = state.columns.flatMap(c => c.items).find(t => t.id === taskId);
       if (task && task.status !== updates.status) {
         // Remove from old
         const colsAfterRemove = newColumns.map(c => ({
            ...c,
            items: c.items.filter(t => t.id !== taskId)
         }));
         // Add to new
         const colsAfterAdd = colsAfterRemove.map(c => {
            if (c.id === updates.status) {
                return { ...c, items: [...c.items, { ...task, ...updates }] };
            }
            return c;
         });
         return { columns: colsAfterAdd };
       }
    }
    return { columns: newColumns };
  }),
}),
{
  name: 'project-storage',
}
)
);
