import { useProjectStore } from "../store/useProjectStore";
import { useEffect, useState } from "react";
import type { Task, Status } from "../types";

// Helper to determine bar position and color based on task
const getTaskPosition = (task: Task, index: number) => {
  // Mock logic to position bars based on date string or ID hash for demo purposes
  // In a real app, we'd parse start/end dates.

  let left = 100 + (index * 50); // Stagger them
  let width = 120; // Default width (3 days)

  // Simple heuristics
  if (task.date === 'Today') {
    left = 400; // Align near the red "Today" line (at ~419px)
    width = 80;
  } else if (task.date?.includes('Oct')) {
    const day = parseInt(task.date.split(' ')[1]);
    if (!isNaN(day)) {
        // Map Oct 1 -> 0px, Oct 30 -> 1200px (approx 40px per day)
        // Offset Oct 1 starts at index 0 of grid
        // The grid starts at Oct 1.
        left = (day - 1) * 40;
    }
  } else if (task.status === 'done') {
     left = 50; // In the past
  } else if (task.status === 'stuck') {
     left = 350; // Near today
     width = 160; // Long drag
  }

  // Ensure bounds
  return { left: Math.max(0, left), width };
};

const getStatusColor = (status: Status) => {
  switch (status) {
    case 'done': return 'bg-success';
    case 'working': return 'bg-warning';
    case 'stuck': return 'bg-error';
    case 'backlog': return 'bg-neutral-status'; // ensuring this matches tailwind config color
    default: return 'bg-primary';
  }
};

export default function ProjectGantt() {
  const { columns, setSelectedTask } = useProjectStore();

  // Flatten tasks from columns to get a single list
  // We can group them by column for the left sidebar
  const allTasks = columns.flatMap(col => col.items);

  // Group by status for the visualization (similar to how Gantt often groups by phase)
  const groupedTasks = columns.map(col => ({
    groupTitle: col.title,
    tasks: col.items,
    colorClass: col.colorClass
  }));

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-white">
      {/* Project Controls Header (Adapted from Screen 7) */}
      <div className="flex flex-col border-b border-border bg-white shrink-0 z-10">
        <div className="px-6 py-2 flex items-center justify-between">
          {/* View Switcher */}
          <nav className="flex items-center gap-1">
            <a href="/board" className="px-4 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-surface rounded-lg transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">table_chart</span>
              Main Table
            </a>
            <a href="/projects/kanban" className="px-4 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-surface rounded-lg transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">view_kanban</span>
              Kanban
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg transition-colors flex items-center gap-2 relative">
              <span className="material-symbols-outlined text-[18px]">waterfall_chart</span>
              Gantt
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></span>
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-surface rounded-lg transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              Calendar
            </a>
          </nav>
          {/* Actions */}
          <div className="flex items-center gap-3">
             <div className="flex items-center -space-x-2">
              <div className="size-8 rounded-full border-2 border-white bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDPwR7Duu9KvkqPU17g_jxtULrSvO4YP2780RRwamRxgGW557u1UDwFy5usikiR5ecA3np-SIkoN-JgtpubpShNJl0w9aY5aSrxflZgga6xIDTU6y6WHU6E-a-6YpJkRU4U0Z8z73Ew5uW6pDR8jFK1ELo9RPncE92PM34gOeSHIE8WhEsTHBub6nTLpdBkTman9bKP-dNhGYEpzxsi5EVO19wRaN2W0wtjZKSNK6_wE6P0h9Oo0_bVbmHL-RCx2DTIXbNCHZO535Wl')"}}></div>
              <div className="size-8 rounded-full border-2 border-white bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBi5I5_DPiUi-Dih_T_IOeP-fqGMgbafBcWLwOaUOeirNGvfT7a9PIrsftGRNTZqldhXdhBGjaI9fLljqlmBbUKkwoTYiIEQFbz5vIKpDeHDWH_3qSJMLE1wrudOlYApbFuPZNh5fXkRpsZigZqwuOWAbDqVpFa_5qQtdNaHebZfjSmuy5Tj49a08WztOHVy3ypWNkltAFKVc__Qid3MIFtT4sE3npez5v3GqdQVx1tViqW4ysliEBW_XKH178M5PRWk-44if0-XbCu')"}}></div>
              <div className="size-8 rounded-full border-2 border-white bg-surface flex items-center justify-center text-xs font-bold text-text-muted">+3</div>
            </div>
            <div className="h-6 w-px bg-border"></div>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-main bg-white border border-border rounded-lg hover:bg-surface transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-main bg-white border border-border rounded-lg hover:bg-surface transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px]">sort</span>
              Sort
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold text-white bg-primary rounded-full hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Item
            </button>
          </div>
        </div>
        {/* Gantt Specific Toolbar */}
        <div className="px-6 py-2 bg-surface border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
              Today
            </button>
            <div className="h-4 w-px bg-border"></div>
            <div className="flex bg-white rounded-lg p-0.5 border border-border shadow-sm">
              <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-surface text-text-muted">Days</button>
              <button className="px-3 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary shadow-sm">Weeks</button>
              <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-surface text-text-muted">Months</button>
              <button className="px-3 py-1 text-xs font-medium rounded-md hover:bg-surface text-text-muted">Qtr</button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <span className="flex items-center gap-1"><span className="block size-2 rounded-full bg-success"></span>Done</span>
            <span className="flex items-center gap-1"><span className="block size-2 rounded-full bg-warning"></span>Working</span>
            <span className="flex items-center gap-1"><span className="block size-2 rounded-full bg-error"></span>Stuck</span>
          </div>
        </div>
      </div>

      {/* Main Content Area: Split Pane */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Pane: Task List */}
        <aside className="w-[280px] bg-white border-r border-border flex flex-col shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          {/* Header for Task List */}
          <div className="h-[57px] border-b border-border flex items-center px-4 bg-surface/50">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Task Name</span>
          </div>
          {/* Task List Container */}
          <div className="flex-1 overflow-y-auto no-scrollbar pb-10">

            {groupedTasks.map((group) => (
              <div key={group.groupTitle} className="group">
                <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-border px-4 py-2 flex items-center justify-between hover:bg-surface/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-text-muted cursor-pointer text-[20px]">keyboard_arrow_down</span>
                    <div className={`w-1 h-4 rounded-full ${group.colorClass.replace('bg-', 'bg-').replace('hover:', '')}`}></div>
                    <h3 className="text-sm font-display font-bold text-text-main">{group.groupTitle}</h3>
                  </div>
                  <span className="text-xs font-mono text-text-muted bg-surface px-1.5 py-0.5 rounded">{group.tasks.length} items</span>
                </div>
                <div className="flex flex-col">
                  {group.tasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task.id)}
                      className="flex items-center h-10 px-4 border-b border-surface hover:bg-surface group/item cursor-pointer"
                    >
                      <div className={`w-2 h-2 rounded-full mr-3 ${getStatusColor(task.status)}`}></div>
                      <span className="text-sm text-text-main font-medium truncate flex-1">{task.title}</span>
                      <span className="material-symbols-outlined text-text-muted opacity-0 group-hover/item:opacity-100 transition-opacity text-[16px]">drag_indicator</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Add Item Button */}
            <button className="flex items-center gap-2 px-4 py-3 text-sm text-text-muted hover:text-primary transition-colors w-full text-left mt-2 group">
              <span className="material-symbols-outlined bg-surface rounded p-0.5 group-hover:bg-primary/10 text-[16px]">add</span>
              <span>Add Task</span>
            </button>
          </div>
        </aside>

        {/* Right Pane: Timeline Canvas */}
        <div className="flex-1 overflow-hidden flex flex-col relative bg-white">
          {/* Timeline Header (Time Scale) */}
          <div className="h-[57px] bg-surface/50 border-b border-border flex shrink-0 overflow-hidden relative">
            {/* Month Label */}
            <div className="absolute top-1 left-4 text-xs font-display font-bold text-text-main z-10 bg-surface/80 backdrop-blur px-2 rounded">October 2023</div>
            {/* Days Grid Header */}
            {/* Assuming 40px per day column for visualization */}
            <div className="flex pt-6 w-full h-full">
              {/* Generate Days dynamically or simplified for mockup */}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <div key={day} className={`flex-shrink-0 w-10 border-r border-border/50 flex justify-center text-[10px] text-text-muted font-mono ${(day % 7 === 0 || day % 7 === 6) ? 'bg-surface' : ''}`}>
                  {day < 10 ? `0${day}` : day}<br/>{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][day % 7]}
                </div>
              ))}
            </div>
          </div>
          {/* Timeline Body (Canvas) */}
          <div className="flex-1 overflow-auto gantt-scroll relative bg-[linear-gradient(to_right,#F5F6F8_1px,transparent_1px)] bg-[size:40px_100%]">
            {/* Current Day Line */}
            <div className="absolute top-0 bottom-0 left-[400px] w-px border-l-2 border-dashed border-error z-20 pointer-events-none">
              <div className="absolute -top-1 -left-[5px] size-2.5 bg-error rounded-full shadow-sm"></div>
            </div>

            {/* Content Wrapper matches Left Pane Height Structure */}
            <div className="min-w-[1200px] pb-10">

              {groupedTasks.map((group) => (
                 <div key={group.groupTitle}>
                    {/* Group Header Spacer */}
                    <div className="h-[41px] border-b border-transparent"></div>

                    {/* Bars */}
                    {group.tasks.map((task, idx) => {
                      const { left, width } = getTaskPosition(task, idx);
                      const color = getStatusColor(task.status);

                      return (
                        <div key={task.id} className="h-10 relative flex items-center border-b border-transparent group/row hover:bg-primary/5 transition-colors">
                            {/* The Bar */}
                            <div
                              onClick={() => setSelectedTask(task.id)}
                              className={`absolute h-6 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer group/bar flex items-center justify-between px-2 ${color}`}
                              style={{ left: `${left}px`, width: `${width}px` }}
                            >
                              <div className="w-1.5 h-1.5 bg-white/50 rounded-full opacity-0 group-hover/bar:opacity-100 cursor-col-resize"></div>
                              <span className="text-[10px] text-white font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">
                                {Math.round(width / 40)} Days
                              </span>
                              <div className="w-1.5 h-1.5 bg-white/50 rounded-full opacity-0 group-hover/bar:opacity-100 cursor-col-resize"></div>
                            </div>

                            {/* Avatar Stack if assignee exists */}
                            {task.assignees.length > 0 && (
                                <div
                                  className="absolute top-2 flex -space-x-1 pointer-events-none"
                                  style={{ left: `${left + width + 8}px` }}
                                >
                                  {task.assignees.map(u => (
                                    <div key={u.id} className="size-4 rounded-full border border-white bg-cover bg-center" style={{backgroundImage: `url('${u.avatarUrl}')`}}></div>
                                  ))}
                                </div>
                            )}
                        </div>
                      );
                    })}
                 </div>
              ))}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
