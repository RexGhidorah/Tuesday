import { useProjectStore } from "../store/useProjectStore";
import { useEffect, useState } from "react";
import type { Task, Status } from "../types";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function TaskDetailPanel() {
  const { columns, selectedTaskId, setSelectedTask, updateTask, activities, currentUser, addActivity } = useProjectStore();
  const [localTask, setLocalTask] = useState<Task | null>(null);
  const [commentText, setCommentText] = useState("");

  // Find the selected task from the store whenever ID changes
  useEffect(() => {
    if (!selectedTaskId) {
      setLocalTask(null);
      return;
    }
    const task = columns.flatMap(col => col.items).find(t => t.id === selectedTaskId);
    setLocalTask(task || null);
  }, [selectedTaskId, columns]);

  // Filter activities related to this task
  const taskActivities = activities.filter(act => act.taskId === selectedTaskId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  if (!selectedTaskId || !localTask) return null;

  // Handlers
  const handleClose = () => setSelectedTask(null);

  const handleChange = (field: keyof Task, value: any) => {
    if (!localTask) return;
    // Optimistic update local state
    setLocalTask({ ...localTask, [field]: value });
    // Update store
    updateTask(localTask.id, { [field]: value });
  };

  const handlePostComment = () => {
    if (!commentText.trim() || !localTask || !currentUser) return;

    addActivity({
        type: 'comment',
        user: currentUser,
        taskId: localTask.id,
        taskTitle: localTask.title,
        timestamp: new Date().toISOString(),
        details: commentText
    });
    setCommentText("");
  };

  const statusOptions: { value: Status; label: string; color: string }[] = [
    { value: 'working', label: 'Working on it', color: 'bg-warning' },
    { value: 'stuck', label: 'Stuck', color: 'bg-error' },
    { value: 'done', label: 'Done', color: 'bg-success' },
    { value: 'backlog', label: 'Backlog', color: 'bg-info' },
  ];

  if (!currentUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 pointer-events-auto transition-opacity"
        onClick={handleClose}
      />

      {/* Panel */}
      <div className="w-[480px] h-full bg-white shadow-2xl pointer-events-auto flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-gray-50/50">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="material-symbols-outlined text-[18px]">view_kanban</span>
            <span>Task Details</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* Title Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Task Name</label>
            <input
              type="text"
              value={localTask.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full text-2xl font-display font-bold text-gray-900 border-none p-0 focus:ring-0 placeholder-gray-300"
              placeholder="Task Title"
            />
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-2 gap-6 p-4 bg-gray-50 rounded-xl border border-gray-100">

            {/* Status */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">Status</label>
              <div className="relative">
                <select
                  value={localTask.status}
                  onChange={(e) => handleChange('status', e.target.value as Status)}
                  className={`w-full appearance-none pl-3 pr-8 py-2 rounded-lg text-sm font-bold text-white cursor-pointer focus:ring-2 focus:ring-offset-1 focus:ring-primary/50 border-none
                    ${statusOptions.find(o => o.value === localTask.status)?.color || 'bg-gray-400'}
                  `}
                >
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value} className="text-gray-900 bg-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2 text-white pointer-events-none">expand_more</span>
              </div>
            </div>

            {/* Due Date */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500">Due Date</label>
              <div className="relative">
                 <span className="material-symbols-outlined absolute left-2 top-2 text-gray-400 text-[18px]">calendar_today</span>
                 <input
                  type="text"
                  value={localTask.date || ''}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:border-primary focus:ring-primary/20"
                  placeholder="Set date..."
                />
              </div>
            </div>

            {/* Assignees (Mock) */}
             <div className="space-y-1 col-span-2">
              <label className="text-xs font-bold text-gray-500">Assignees</label>
              <div className="flex items-center gap-2">
                {localTask.assignees.map(user => (
                  <div key={user.id} className="relative group cursor-pointer">
                    <img
                      src={user.avatarUrl || 'https://via.placeholder.com/40'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {user.name}
                    </div>
                  </div>
                ))}
                <button className="w-8 h-8 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
            </div>

          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
            <textarea
              rows={8}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:bg-white focus:border-primary focus:ring-primary/20 transition-all resize-none"
              placeholder="Add a more detailed description..."
              value={localTask.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          {/* Activity Section */}
          <div className="pt-6 border-t border-gray-100 space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Activity Log</label>
             </div>

             <div className="flex gap-3">
               <img src={currentUser.avatarUrl} className="w-8 h-8 rounded-full border border-gray-200" alt="You" />
               <div className="flex-1 bg-white border border-gray-200 rounded-lg p-3 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                 <textarea
                    rows={2}
                    className="w-full border-none p-0 text-sm focus:ring-0 resize-none placeholder-gray-400"
                    placeholder="Write an update..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handlePostComment();
                        }
                    }}
                 />
                 <div className="flex justify-end mt-2">
                   <button
                    onClick={handlePostComment}
                    disabled={!commentText.trim()}
                    className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-primary-hover transition-colors disabled:opacity-50"
                   >
                    Post
                   </button>
                 </div>
               </div>
             </div>

             {/* Task History Feed */}
             <div className="space-y-4 mt-4">
                {taskActivities.map(act => (
                    <div key={act.id} className="flex gap-3 text-sm group">
                        <img src={act.user.avatarUrl} className="w-8 h-8 rounded-full border border-gray-200" alt={act.user.name} />
                        <div className="flex-1">
                             <div className="flex items-baseline justify-between">
                                <span className="font-bold text-text-main">{act.user.name}</span>
                                <span className="text-xs text-text-muted">{formatDistanceToNow(parseISO(act.timestamp), { addSuffix: true })}</span>
                             </div>

                             {act.type === 'comment' && (
                                <div className="mt-1 text-text-main bg-surface p-2 rounded-lg rounded-tl-none border border-border/50">
                                    {act.details}
                                </div>
                             )}
                             {act.type === 'status_change' && (
                                <div className="mt-1 text-text-muted">
                                    changed status to <span className="font-bold uppercase text-xs">{act.meta?.newStatus}</span>
                                </div>
                             )}
                             {act.type === 'create_task' && <div className="mt-1 text-text-muted">created this task</div>}
                        </div>
                    </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
