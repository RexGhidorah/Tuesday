import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Column } from '../../types';
import { KanbanCard } from './KanbanCard';
import clsx from 'clsx';

interface KanbanColumnProps {
  column: Column;
}

export function KanbanColumn({ column }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  return (
    <div className="flex flex-col w-[320px] h-full rounded-xl bg-surface/50 border border-border/40">
      {/* Header */}
      <div className="relative px-4 py-3 flex items-center justify-between bg-white rounded-t-xl border-b border-border shadow-sm z-10">
        <div className={clsx("absolute top-0 left-0 w-full h-[3px] rounded-t-xl", column.colorClass)}></div>
        <div className="flex items-center gap-2 mt-1">
          <h3 className="font-display font-bold text-text-main text-base">{column.title}</h3>
          <span className="flex items-center justify-center bg-surface px-2 py-0.5 rounded-full text-xs font-bold text-text-muted border border-border">
            {column.items.length}
          </span>
        </div>
        <button className="text-text-muted hover:bg-surface p-1 rounded-md transition-colors mt-1">
          <span className="material-symbols-outlined text-[20px]">more_horiz</span>
        </button>
      </div>

      {/* Cards Container */}
      <div ref={setNodeRef} className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar min-h-[150px]">
        <SortableContext items={column.items.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {column.items.map((task) => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>

      {/* Add Button */}
      <div className="p-3 pt-0">
        <button className="w-full flex items-center justify-start gap-2 p-2 rounded-lg text-text-muted hover:bg-white hover:shadow-sm hover:text-primary transition-all text-sm font-medium">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Item
        </button>
      </div>
    </div>
  );
}
