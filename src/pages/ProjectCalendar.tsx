import { useProjectStore } from "../store/useProjectStore";
import type { Task, Status } from "../types";

// Helper to get status color
const getStatusColor = (status: Status) => {
  switch (status) {
    case 'done': return 'bg-success border-success/20 text-white';
    case 'working': return 'bg-warning border-warning/20 text-white';
    case 'stuck': return 'bg-error border-error/20 text-white';
    case 'backlog': return 'bg-neutral-status border-neutral-status/20 text-white';
    default: return 'bg-primary border-primary/20 text-white';
  }
};

// Mock parsing logic to map task strings to October 2023 days
const getDayFromDateString = (dateStr?: string): number | null => {
  if (!dateStr) return null;

  if (dateStr === 'Today') return 24; // Mocking Today as Oct 24 for demo consistency
  if (dateStr === 'Yesterday') return 23;

  if (dateStr.includes('Oct')) {
    const parts = dateStr.split(' ');
    const day = parseInt(parts[1]);
    return isNaN(day) ? null : day;
  }

  return null;
};

export default function ProjectCalendar() {
  const { columns, setSelectedTask } = useProjectStore();

  // Flatten tasks
  const allTasks = columns.flatMap(col => col.items);

  // Generate Calendar Days for October 2023
  // Oct 1 2023 was a Sunday. 31 Days.
  const daysInMonth = 31;
  const startingDayIndex = 0; // 0 = Sunday

  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const dayNumber = i - startingDayIndex + 1;
    const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;

    if (!isValidDay) return { day: null, tasks: [] };

    // Find tasks for this day
    const dayTasks = allTasks.filter(t => getDayFromDateString(t.date) === dayNumber);

    return {
      day: dayNumber,
      tasks: dayTasks
    };
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-white">
       {/* Project Controls Header (Reused) */}
       <div className="flex flex-col border-b border-border bg-white shrink-0 z-10">
        <div className="px-6 py-2 flex items-center justify-between">
          {/* View Switcher */}
          <nav className="flex items-center gap-1">
            <a href="/board" className="px-4 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-surface rounded-lg transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">table_chart</span>
              Main Table
            </a>
            <a href="/kanban" className="px-4 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-surface rounded-lg transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">view_kanban</span>
              Kanban
            </a>
            <a href="/gantt" className="px-4 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-surface rounded-lg transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">waterfall_chart</span>
              Gantt
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg transition-colors flex items-center gap-2 relative">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              Calendar
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></span>
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
        {/* Calendar Specific Controls */}
        <div className="px-6 py-2 bg-surface border-t border-border flex items-center justify-between">
             <div className="flex items-center gap-4">
                 <h2 className="text-lg font-display font-bold text-text-main">October 2023</h2>
                 <div className="flex bg-white rounded-lg p-0.5 border border-border shadow-sm">
                    <button className="px-2 py-1 hover:bg-surface rounded"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                    <button className="px-2 py-1 hover:bg-surface rounded"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                 </div>
                 <button className="text-sm font-bold text-primary hover:underline">Today</button>
             </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 p-6 overflow-y-auto bg-surface/30">
        <div className="bg-white rounded-xl border border-border shadow-sm h-full flex flex-col">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 border-b border-border">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-3 text-center text-xs font-bold text-text-muted uppercase tracking-wider border-r border-border last:border-r-0">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="flex-1 grid grid-cols-7 grid-rows-5">
                {calendarDays.map((cell, idx) => (
                    <div key={idx} className={`border-b border-r border-border p-2 min-h-[120px] flex flex-col relative group hover:bg-surface/30 transition-colors ${idx % 7 === 6 ? 'border-r-0' : ''} ${cell.day === 24 ? 'bg-primary/5' : ''}`}>
                        {cell.day && (
                            <>
                                <div className={`text-sm font-mono mb-2 ${cell.day === 24 ? 'text-primary font-bold bg-primary/10 size-7 flex items-center justify-center rounded-full' : 'text-text-muted'}`}>
                                    {cell.day}
                                </div>
                                <div className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                                    {cell.tasks.map(task => (
                                        <div
                                            key={task.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedTask(task.id);
                                            }}
                                            className={`px-2 py-1 rounded text-[11px] font-bold truncate cursor-pointer shadow-sm hover:opacity-90 transition-opacity flex items-center gap-1 ${getStatusColor(task.status)}`}
                                        >
                                            {task.title}
                                        </div>
                                    ))}
                                </div>
                                {/* Add button on hover */}
                                <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-surface rounded-full text-text-muted transition-opacity">
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
