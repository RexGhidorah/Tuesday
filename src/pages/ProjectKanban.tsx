import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useProjectStore } from '../store/useProjectStore';
import { KanbanColumn } from '../components/kanban/KanbanColumn';
import { KanbanCard } from '../components/kanban/KanbanCard';
import type { Task } from '../types';

export default function ProjectKanban() {
  const { columns, moveTask, addTask } = useProjectStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const task = columns.flatMap((col) => col.items).find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if over is a column
    const overColumn = columns.find((col) => col.id === overId);

    if (overColumn) {
      // Dropped on a column directly
      if (activeTask && activeTask.status !== overColumn.id) {
        moveTask(activeId, overColumn.id);
      }
    } else {
      // Dropped on a task
      const overTask = columns.flatMap((col) => col.items).find((t) => t.id === overId);
      if (overTask && activeTask && activeTask.status !== overTask.status) {
        moveTask(activeId, overTask.status);
      }
    }

    setActiveTask(null);
  }

  const handleAddNewItem = () => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Item',
      status: 'working',
      tags: [
        { id: 't-new', name: 'General', color: 'bg-gray-100', textColor: 'text-gray-600' },
      ],
      date: 'Today',
      assignees: [],
    };
    addTask('working', newTask);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
      {/* Sub-Header: Project Controls */}
      <div className="flex-none px-6 py-4 flex flex-col gap-4 border-b border-border bg-white z-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-display font-bold text-text-main tracking-tight">
              Website Redesign
            </h1>
            <p className="text-text-muted text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              On Track
              <span className="text-border mx-1">•</span>
              Last updated 2m ago
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 mr-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaNJOf-bMmb5L3uK9wqh2jlj5NxQhD0OKDg6voiHiAwdpN5ve3EMVcpcylX0Q0DYlc2oYbva9W5uwd0oCqJT0FZfV2a9Sj42Q2gzkQLyr2tOOcXhMpKofINTs64RWDLBSKzQgzzYYIyBB7kroVMhfplk7uRAsLgBehftsQyR4dB4ggWccM7IziJt4-YS2p-rPEsLqX0UVzM2G6bUqIMjrHfJHkT2GqiHWTumdxz4uZlS5oJzdpUoz6xihbGDyGWUhYsVfw1lJBfU4C"
                alt="Team member"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlDtPWFdUim_JCnojBwqkDILTfte2f7sK1k7YiugCwSAkDC7S3IkZIV02M0v4QA7jjw-wJ02ubocIVegTyLnFGEamoifbfP5QqIXWkxtzaL5DUVBayhanrDqoHQs4PowQSMDl8lgaefme1NDIWnJpfW-m9ihpvIJLfTuo6DB-LF6MXBE3iu3-DlewOVDfOtr5Ak92qGxov21AC1jm9ppO8wCv5Zb81HvzrjaglQVmc66GIp7aXW8mp41X16nTJo8ddAq3mgO4q9AyK"
                alt="Team member"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtxIZ8zeWIBcabo1aNTVNzlv_k991YdQzTToN259Wj0vcNxHqeOlkPXXWNjjF3Oo2cFvGZEBBACTcg__QdDIzfCrF9XXfXfL3M4RGTGWLtYqgvmtNxxYvdnTY9sqbbqmCp9Th1AONW56aUd1xWUDFRzuBH2IphxGlXfMb15ua6qfk3cNuDL3kWEg6WQIMWODZeQsbQoSkE2HK29ZT-_CtsZ8trPKKZE9vhx3OKe1ge2Aa3L8cIFQ6I2Bq9bGICXMOXfqPUEDWUj8Iq"
                alt="Team member"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-surface flex items-center justify-center text-xs font-bold text-text-muted">
                +4
              </div>
            </div>
            <button
              onClick={handleAddNewItem}
              className="flex items-center justify-center gap-2 px-4 h-9 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-full transition-colors shadow-md shadow-primary/20"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>New Item</span>
            </button>
          </div>
        </div>
        {/* View Switcher Tabs */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex border-b border-transparent gap-6">
            <a
              href="/board"
              className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-text-muted hover:text-text-main transition-colors group"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                table_chart
              </span>
              <span className="text-sm font-bold">Main Table</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 pb-3 border-b-2 border-primary text-text-main"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">
                view_kanban
              </span>
              <span className="text-sm font-bold">Kanban</span>
            </a>
            <a
              href="/gantt"
              className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-text-muted hover:text-text-main transition-colors group"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                waterfall_chart
              </span>
              <span className="text-sm font-bold">Gantt</span>
            </a>
            <a
              href="/calendar"
              className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-text-muted hover:text-text-main transition-colors group"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                calendar_month
              </span>
              <span className="text-sm font-bold">Calendar</span>
            </a>
          </div>
          <div className="flex items-center gap-2 pb-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-text-muted hover:bg-surface rounded-md text-sm font-medium transition-colors">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-text-muted hover:bg-surface rounded-md text-sm font-medium transition-colors">
              <span className="material-symbols-outlined text-[18px]">sort</span>
              Sort
            </button>
          </div>
        </div>
      </div>

      {/* Main Kanban Board Area */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden bg-white p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex h-full gap-6 min-w-max pb-4">
            {columns.map((col) => (
              <KanbanColumn key={col.id} column={col} />
            ))}
          </div>
          <DragOverlay>
            {activeTask ? <KanbanCard task={activeTask} isOverlay /> : null}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
}
