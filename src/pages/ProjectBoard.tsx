import { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { ProjectTableRow } from '../components/board/ProjectTableRow';
import type { Task } from '../types';

export default function ProjectBoard() {
  const { columns, addTask } = useProjectStore();
  const [newItemTitle, setNewItemTitle] = useState('');

  // "This Week" (Active) = working, stuck, done
  const activeTasks = columns
    .filter((col) => ['working', 'stuck', 'done'].includes(col.id))
    .flatMap((col) => col.items);

  // "Backlog"
  const backlogTasks =
    columns.find((col) => col.id === 'backlog')?.items || [];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newItemTitle,
      status: 'working',
      tags: [],
      date: 'Today',
      assignees: [],
    };
    addTask('working', newTask);
    setNewItemTitle('');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-white shrink-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-display font-bold text-text-main tracking-tight">
            Sprint 24: Core Features
          </h2>
          <div className="h-6 w-px bg-border mx-2"></div>
          <div className="flex -space-x-2">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQrkYKZ1cI6dEr6MH-42jUBzX0ZG3bGUdUS5hiJSWpw4awmuJYR9yQGurbZaz-cZmxHOvp5m4lCPvHbksLbhMTXI3_TsKCgBbZXS-afv0GWRzzOcWanHo5ZzcU5U5nL4AEr9Qcp7WZF934c2bzZRciOW_RpM3uQx7KNT58oHBBq_BbsF_VdSoXVYIi7rSK4OJJlzNWiYUodlFYEIYJkxsDYQOspb2VOy4l3ux5JXGVsKBEQ25SijgvD7CbEvbiJsxPH9z-Z46odg-_"
              alt="Team member avatar 1"
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcV3ibc5ORUQ4tMplW_xGN8EZVL899hdB-iOQ_Pw5RC5QX2C05lWYs3TMRLnBjXoU7Ywp2QhvG6F2c2ni8sGBmaANcAfTTrtkvbxwZR9cojzf0iprSJD3oix4r0Cz06E_TkP8RlyTuIx9HLeaD7ptGyjsmZbGDcOlYjQXoQoxKSqoXDIqdJzOrZqDdrnmP92DQIXyYhdJOZYoPxHgTgdUSA6piM_00ZEhGakBeDuNkLVHuUfcw-_SkhI3Ls3Savob0IHl7b2AAzvwU"
              alt="Team member avatar 2"
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC6dfH0KZTb_0tj4V3C4wQWgH-QxcvaqLqu0xykuWtPK5WQuu2kSHHAGe1NYn52pPadQxiRA8RPjA_INPCWgR2tLLMmH-xx_G9WQbb6cdglI_Cb_nPjQG1pXjxiREUGwy43YZx_9Z-oGNfD5jAtNbs2sMKI4RLiXYYKHtA6rCaPLT6g5AGOrQ25w9vaI1Ocewkv5shzZ14AQyyIB7JHj6q82eskZZdWM-TGcCrRNhaCmMntdANCnj5Y9gKvaiizDJD63xs7dy7GpFW"
              alt="Team member avatar 3"
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
            <div className="w-8 h-8 rounded-full border-2 border-white bg-surface text-muted text-xs flex items-center justify-center font-bold">
              +4
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-muted text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-4 py-1.5 bg-surface border-transparent focus:border-primary focus:ring-0 rounded-full text-sm w-48 transition-all hover:bg-gray-100 placeholder-muted/70 text-text-main"
            />
          </div>
          <button className="p-2 text-muted hover:text-text-main hover:bg-surface rounded-full transition-colors">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
          <button className="p-2 text-muted hover:text-text-main hover:bg-surface rounded-full transition-colors">
            <span className="material-symbols-outlined">sort</span>
          </button>
          <div className="h-6 w-px bg-border mx-1"></div>
          <button className="px-4 py-1.5 bg-surface hover:bg-gray-100 text-text-main text-sm font-bold rounded-full transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">share</span>
            Share
          </button>
        </div>
      </header>

      {/* View Switcher Tabs */}
      <div className="px-6 border-b border-border bg-white flex items-center gap-6 overflow-x-auto scrollbar-hide shrink-0">
        <a
          href="#"
          className="relative py-3 text-sm font-bold text-primary flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">
            table_chart
          </span>
          Main Table
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full"></div>
        </a>
        <a
          href="#"
          className="py-3 text-sm font-medium text-muted hover:text-text-main flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">
            view_kanban
          </span>
          Kanban
        </a>
        <a
          href="#"
          className="py-3 text-sm font-medium text-muted hover:text-text-main flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">
            bar_chart
          </span>
          Gantt
        </a>
        <a
          href="#"
          className="py-3 text-sm font-medium text-muted hover:text-text-main flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">
            timeline
          </span>
          Timeline
        </a>
        <a
          href="#"
          className="py-3 text-sm font-medium text-muted hover:text-text-main flex items-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">
            description
          </span>
          Files
        </a>
      </div>

      {/* Main Board Area */}
      <div className="flex-1 overflow-auto bg-white p-6 pb-20">
        {/* Group 1: Active Sprint */}
        <div className="mb-10 group/section">
          {/* Group Header */}
          <div className="flex items-center gap-2 mb-2 sticky left-0 z-20 group-header-sticky bg-white py-2">
            <span className="material-symbols-outlined text-muted cursor-pointer hover:text-primary transition-colors">
              expand_circle_down
            </span>
            <h3 className="text-lg font-display font-bold text-primary pl-2 border-l-4 border-primary leading-tight">
              This Week
            </h3>
            <span className="text-muted text-sm font-mono ml-2">
              {activeTasks.length} items
            </span>
          </div>

          {/* Table Container */}
          <div className="relative overflow-visible">
            <div className="min-w-[1000px] border border-border rounded-lg shadow-sm bg-white overflow-hidden">
              {/* Table Header */}
              <div className="flex bg-surface border-b border-border text-xs font-display font-bold text-muted uppercase tracking-wide sticky top-0 z-10">
                <div className="w-10 p-3 flex items-center justify-center border-r border-border/50 sticky left-0 bg-surface z-20">
                  <input
                    type="checkbox"
                    className="custom-checkbox rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                  />
                </div>
                <div className="flex-1 min-w-[320px] p-3 border-r border-border/50 sticky left-10 bg-surface z-20 shadow-[4px_0_12px_rgba(0,0,0,0.02)]">
                  Item
                </div>
                <div className="w-[120px] p-3 text-center border-r border-border/50">
                  Owner
                </div>
                <div className="w-[160px] p-3 text-center border-r border-border/50">
                  Status
                </div>
                <div className="w-[200px] p-3 text-center border-r border-border/50">
                  Timeline
                </div>
                <div className="w-[120px] p-3 text-center border-r border-border/50">
                  Priority
                </div>
                <div className="w-[100px] p-3 text-center">Est. Hours</div>
              </div>

              {/* Rows */}
              {activeTasks.map((task) => (
                <ProjectTableRow key={task.id} task={task} />
              ))}

              {/* Add Item Row */}
              <form
                onSubmit={handleAddItem}
                className="flex items-center hover:bg-surface/30 transition-colors group/add"
              >
                <div className="w-10 p-2 border-r border-transparent sticky left-0 z-10 bg-white"></div>
                <div className="flex-1 min-w-[320px] p-2 border-r border-transparent sticky left-10 z-10 bg-white shadow-[4px_0_12px_rgba(0,0,0,0.02)] flex items-center">
                  <div className="flex items-center gap-3 w-full pl-1 cursor-text">
                    <span className="material-symbols-outlined text-primary group-hover/add:bg-primary/10 rounded-full p-1 transition-colors text-[20px]">
                      add
                    </span>
                    <input
                      type="text"
                      placeholder="Add Item"
                      className="w-full text-sm bg-transparent border-none focus:ring-0 placeholder-muted/70 text-text-main h-8"
                      value={newItemTitle}
                      onChange={(e) => setNewItemTitle(e.target.value)}
                    />
                  </div>
                </div>
                {/* Empty cells for alignment */}
                <div className="w-[120px] border-r border-transparent"></div>
                <div className="w-[160px] border-r border-transparent"></div>
                <div className="w-[200px] border-r border-transparent"></div>
                <div className="w-[120px] border-r border-transparent"></div>
                <div className="w-[100px]"></div>
              </form>

              {/* Summary Row */}
              <div className="flex items-center border-t border-border bg-surface/50 font-bold text-xs text-text-main">
                <div className="w-10 p-2 sticky left-0 z-10 bg-surface/50"></div>
                <div className="flex-1 min-w-[320px] p-3 text-right sticky left-10 z-10 bg-surface/50 shadow-[4px_0_12px_rgba(0,0,0,0.02)]">
                  TOTALS
                </div>
                <div className="w-[120px] p-3 border-l border-border/20"></div>
                <div className="w-[160px] p-3 border-l border-border/20 flex justify-center">
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden flex">
                    <div className="bg-success w-[25%] h-full"></div>
                    <div className="bg-warning w-[25%] h-full"></div>
                    <div className="bg-error w-[25%] h-full"></div>
                    <div className="bg-info w-[25%] h-full"></div>
                  </div>
                </div>
                <div className="w-[200px] p-3 border-l border-border/20 text-center text-muted font-mono">
                  4w Range
                </div>
                <div className="w-[120px] p-3 border-l border-border/20"></div>
                <div className="w-[100px] p-3 border-l border-border/20 text-center font-mono">
                  27h
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Group 2: Backlog */}
        <div className="mb-10 group/section opacity-70 hover:opacity-100 transition-opacity">
          {/* Group Header */}
          <div className="flex items-center gap-2 mb-2 sticky left-0 z-20 group-header-sticky bg-white py-2">
            <span className="material-symbols-outlined text-muted cursor-pointer hover:text-primary transition-colors">
              expand_circle_right
            </span>
            <h3 className="text-lg font-display font-bold text-[#8B5CF6] pl-2 border-l-4 border-[#8B5CF6] leading-tight">
              Backlog
            </h3>
            <span className="text-muted text-sm font-mono ml-2">
              {backlogTasks.length} items
            </span>
          </div>

          {/* Backlog Table */}
          <div className="relative overflow-visible">
            <div className="min-w-[1000px] border border-border rounded-lg shadow-sm bg-white overflow-hidden">
              {backlogTasks.map((task) => (
                <ProjectTableRow key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
