import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../../types';
import clsx from 'clsx';
import { useProjectStore } from '../../store/useProjectStore';

interface KanbanCardProps {
  task: Task;
  isOverlay?: boolean;
}

export function KanbanCard({ task, isOverlay }: KanbanCardProps) {
  const setSelectedTask = useProjectStore(state => state.setSelectedTask);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent opening panel if dragging
    if (isDragging) return;

    // Prevent drag listeners from firing if we're clicking interactive elements inside
    // For now, dragging is handled by listeners on the whole card, but we want click to work too.
    // dnd-kit handles distinction between drag and click well usually.
    setSelectedTask(task.id);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="h-[140px] w-full rounded-lg bg-gray-100 border border-dashed border-gray-300 opacity-50"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className={clsx(
        "group bg-white rounded-lg border border-gray-200 shadow-cell hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing",
        task.status === 'done' && !isOverlay && "opacity-70 hover:opacity-100",
        isOverlay && "rotate-[5deg] scale-105 shadow-float ring-2 ring-primary ring-offset-2 opacity-90 z-50"
      )}
    >
      {task.coverImage && (
        <div
          className={clsx(
            "h-[120px] w-full bg-cover bg-center rounded-t-lg",
            task.status === 'done' && !isOverlay && "grayscale group-hover:grayscale-0 transition-all"
          )}
          style={{ backgroundImage: `url('${task.coverImage}')` }}
        />
      )}
      <div className="p-3">
        <div className="flex flex-wrap gap-2 mb-2">
          {task.tags.map((tag) => (
            <span
              key={tag.id}
              className={clsx(
                "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                tag.color,
                tag.textColor
              )}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <h4
          className={clsx(
            "text-text-main font-medium text-sm leading-snug mb-3",
            task.status === 'done' && !isOverlay && "line-through text-text-muted"
          )}
        >
          {task.title}
        </h4>
        <div className="flex items-center justify-between border-t border-surface pt-3 mt-1">
          <div
            className={clsx(
              "flex items-center gap-1.5 px-2 py-1 rounded-md",
              task.isOverdue
                ? "text-error bg-error/10"
                : task.date === 'Today'
                ? "text-warning bg-warning/10"
                : task.status === 'done'
                ? "text-success"
                : "text-text-muted"
            )}
          >
            <span className="material-symbols-outlined text-[14px]">
              {task.isOverdue
                ? 'warning'
                : task.status === 'done'
                ? 'check_circle'
                : 'calendar_today'}
            </span>
            <span
              className={clsx(
                "text-xs",
                task.isOverdue || task.date === 'Today' ? "font-bold" : "font-mono"
              )}
            >
              {task.date}
            </span>
          </div>
          <div className="flex -space-x-1.5">
            {task.assignees.map((user) => (
              <img
                key={user.id}
                src={user.avatarUrl}
                alt={user.name}
                className={clsx(
                  "w-6 h-6 rounded-full border border-white shadow-sm",
                  task.status === 'done' && !isOverlay && "grayscale"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
