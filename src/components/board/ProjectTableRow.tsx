import clsx from 'clsx';
import { useProjectStore } from '../../store/useProjectStore';
import type { Task, Status } from '../../types';

interface ProjectTableRowProps {
  task: Task;
}

export function ProjectTableRow({ task }: ProjectTableRowProps) {
  const { setSelectedTask } = useProjectStore();

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'done':
        return 'bg-success hover:bg-green-500';
      case 'working':
        return 'bg-warning hover:bg-orange-400';
      case 'stuck':
        return 'bg-error hover:bg-red-500';
      case 'backlog':
        return 'bg-neutral-status hover:bg-gray-400';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusLabel = (status: Status) => {
    switch (status) {
      case 'working':
        return 'Working on it';
      case 'stuck':
        return 'Stuck';
      case 'done':
        return 'Done';
      case 'backlog':
        return 'Not Started';
      default:
        return status;
    }
  };

  const handleRowClick = () => {
    setSelectedTask(task.id);
  };

  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't open detail panel when clicking status
    // Logic moved to detail panel mostly, but keeping quick toggle could be nice
    // For now, let's just open the panel to edit status properly
    setSelectedTask(task.id);
  };

  return (
    <div
      onClick={handleRowClick}
      className="group flex items-center border-b border-border/50 hover:bg-surface/50 transition-colors cursor-pointer"
    >
      {/* Drag Handle */}
      <div className="w-10 p-2 flex items-center justify-center border-r border-border/50 bg-white group-hover:bg-surface/50 sticky left-0 z-10">
        <span className="material-symbols-outlined text-muted/30 cursor-move opacity-0 group-hover:opacity-100 text-[18px]">
          drag_indicator
        </span>
      </div>

      {/* Item Title + Color Bar */}
      <div className="flex-1 min-w-[320px] p-2 border-r border-border/50 bg-white group-hover:bg-surface/50 sticky left-10 z-10 shadow-[4px_0_12px_rgba(0,0,0,0.02)] flex items-center gap-3">
        <div
          className={clsx(
            'w-1 h-6 rounded-full',
            getStatusColor(task.status).split(' ')[0]
          )}
        ></div>
        <span className="text-sm font-medium text-text-main truncate">
          {task.title}
        </span>
        <span className="material-symbols-outlined text-muted/50 text-[16px] ml-auto cursor-pointer hover:text-primary">
          chat_bubble
        </span>
      </div>

      {/* Owner */}
      <div className="w-[120px] p-2 flex justify-center border-r border-border/50">
        <div className="flex -space-x-2">
          {task.assignees.map((user) => (
            <img
              key={user.id}
              src={user.avatarUrl}
              alt={user.name}
              className="w-7 h-7 rounded-full border border-white"
            />
          ))}
          {task.assignees.length === 0 && (
            <div className="w-7 h-7 rounded-full bg-surface border border-border dashed border-dashed flex items-center justify-center text-muted">
              <span className="material-symbols-outlined text-[14px]">
                person_add
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="w-[160px] p-1.5 flex justify-center border-r border-border/50 relative">
        <button
          onClick={handleStatusClick}
          className={clsx(
            'w-full h-8 rounded-full text-white text-xs font-bold shadow-cell status-cell flex items-center justify-center transition-colors',
            getStatusColor(task.status)
          )}
        >
          {getStatusLabel(task.status)}
        </button>
      </div>

      {/* Timeline (Mock visual) */}
      <div className="w-[200px] p-2 flex justify-center items-center border-r border-border/50">
        <div
          className={clsx(
            'w-full h-7 rounded-full relative overflow-hidden group/timeline cursor-pointer',
            task.status === 'done'
              ? 'bg-success/10'
              : task.status === 'stuck'
              ? 'bg-error/10'
              : 'bg-primary/10'
          )}
        >
          <div
            className={clsx(
              'absolute top-0 left-[10%] w-[60%] h-full rounded-full opacity-60',
              task.status === 'done'
                ? 'bg-success'
                : task.status === 'stuck'
                ? 'bg-error'
                : 'bg-primary'
            )}
          ></div>
          <span
            className={clsx(
              'absolute inset-0 flex items-center justify-center text-[10px] font-mono font-medium opacity-0 group-hover/timeline:opacity-100 transition-opacity',
              task.status === 'done'
                ? 'text-success'
                : task.status === 'stuck'
                ? 'text-error'
                : 'text-primary'
            )}
          >
            {task.date || 'Oct 12 - 15'}
          </span>
        </div>
      </div>

      {/* Priority (Using first tag as proxy or hardcoded logic if tag missing) */}
      <div className="w-[120px] p-1.5 flex justify-center border-r border-border/50">
        {task.tags[0] ? (
          <div
            className={clsx(
              'px-3 py-1 text-xs font-bold rounded-full border',
              task.tags[0].color,
              task.tags[0].textColor,
              'border-transparent' // Override simplistic border logic for now
            )}
          >
            {task.tags[0].name}
          </div>
        ) : (
          <div className="px-3 py-1 bg-surface text-muted text-xs font-bold rounded-full border border-border">
            Low
          </div>
        )}
      </div>

      {/* Est Hours */}
      <div className="w-[100px] p-2 flex justify-center items-center font-mono text-sm text-muted">
        {Math.floor(Math.random() * 10) + 1}
      </div>
    </div>
  );
}
