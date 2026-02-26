import { useProjectStore } from "../store/useProjectStore";
import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import type { Activity } from "../types";

export default function Dashboard() {
  const { currentUser, columns, activities, setSelectedTask } = useProjectStore();

  // "Favorite Projects" - For now, using mock stats but deriving counts from store
  const allTasks = useMemo(() => columns.flatMap(col => col.items), [columns]);
  const doneTasksCount = allTasks.filter(t => t.status === 'done').length;
  const totalTasksCount = allTasks.length;
  const overallProgress = totalTasksCount > 0 ? Math.round((doneTasksCount / totalTasksCount) * 100) : 0;

  // "My Work" - Tasks assigned to currentUser
  const myTasks = useMemo(() => {
    if (!currentUser) return [];
    return allTasks.filter(task =>
      task.assignees.some(u => u.id === currentUser.id)
    );
  }, [allTasks, currentUser]);

  // Group My Tasks by rough timeframe (mock logic for now, utilizing 'date' string)
  const myTasksToday = myTasks.filter(t => t.date === 'Today');
  const myTasksOverdue = myTasks.filter(t => t.isOverdue);
  // Just show all assigned tasks for simplicity in this view
  const displayTasks = [...myTasksToday, ...myTasks.filter(t => t.date !== 'Today' && !t.isOverdue)];

  // "Inbox" - Activities where user is mentioned or related to their tasks
  const inboxActivities = useMemo(() => {
     if (!currentUser) return [];
     return activities.filter(act => {
        // Show if mentioning user
        if (act.type === 'mention' && act.details?.includes(currentUser.name)) return true;
        // Show if user is assigned to the task (and didn't do the action themselves)
        const relevantTask = allTasks.find(t => t.id === act.taskId);
        if (relevantTask && relevantTask.assignees.some(u => u.id === currentUser.id) && act.user.id !== currentUser.id) {
            return true;
        }
        return false; // Filter out irrelevant noise for now
     }).slice(0, 10); // Limit to 10
  }, [activities, allTasks, currentUser]);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
        case 'status_change': return { icon: 'priority_high', color: 'bg-error' }; // Defaulting to attention
        case 'comment': return { icon: 'alternate_email', color: 'bg-primary' };
        case 'mention': return { icon: 'alternate_email', color: 'bg-primary' };
        case 'upload_file': return { icon: 'upload_file', color: 'bg-warning' };
        case 'create_task': return { icon: 'add', color: 'bg-success' };
        default: return { icon: 'notifications', color: 'bg-info' };
    }
  };

  const formatActivityTime = (isoString: string) => {
    try {
        return formatDistanceToNow(new Date(isoString), { addSuffix: true });
    } catch (e) {
        return 'recently';
    }
  };

  if (!currentUser) {
      return <div className="p-10">Loading profile...</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
        {/* Greeting & Header */}
        <section className="flex flex-col gap-1">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-text-main">Good morning, {currentUser.name.split(' ')[0]}</h1>
          <p className="text-text-muted text-lg font-body flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
        </section>

        {/* Project Shortcuts (Horizontal Scroll) */}
        <section className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted font-display">Active Projects</h3>
            <button className="text-primary text-sm font-medium hover:underline">View all</button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
            {/* Main Project Card (Dynamic Stats) */}
            <div className="bg-white border border-border rounded-2xl shadow-sm hover:shadow-float transition-all p-4 flex flex-col justify-between h-[120px] min-w-[240px] cursor-pointer group">
              <div className="flex justify-between items-start">
                <div className="size-8 rounded-lg bg-[#594EE6]/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">rocket_launch</span>
                </div>
                <span className="material-symbols-outlined text-text-muted group-hover:text-primary text-[20px]">arrow_outward</span>
              </div>
              <div>
                <h4 className="font-bold text-text-main mb-2">Website Redesign</h4>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: `${overallProgress}%` }}></div>
                  </div>
                  <span className="text-xs font-mono text-text-muted">{overallProgress}%</span>
                </div>
              </div>
            </div>
             {/* Mock shortcuts to fill UI */}
            <div className="bg-white border border-border rounded-2xl shadow-sm hover:shadow-float transition-all p-4 flex flex-col justify-between h-[120px] min-w-[240px] cursor-pointer group">
              <div className="flex justify-between items-start">
                <div className="size-8 rounded-lg bg-[#FDAB3D]/10 flex items-center justify-center text-warning">
                  <span className="material-symbols-outlined">smartphone</span>
                </div>
                <span className="material-symbols-outlined text-text-muted group-hover:text-primary text-[20px]">arrow_outward</span>
              </div>
              <div>
                <h4 className="font-bold text-text-main mb-2">Mobile App Refactor</h4>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-warning w-[30%] rounded-full"></div>
                  </div>
                  <span className="text-xs font-mono text-text-muted">30%</span>
                </div>
              </div>
            </div>
             <div className="bg-white border border-border rounded-2xl shadow-sm hover:shadow-float transition-all p-4 flex flex-col justify-between h-[120px] min-w-[240px] cursor-pointer group">
              <div className="flex justify-between items-start">
                <div className="size-8 rounded-lg bg-[#579BFC]/10 flex items-center justify-center text-info">
                  <span className="material-symbols-outlined">palette</span>
                </div>
                <span className="material-symbols-outlined text-text-muted group-hover:text-primary text-[20px]">arrow_outward</span>
              </div>
              <div>
                <h4 className="font-bold text-text-main mb-2">Design System</h4>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-info w-[92%] rounded-full"></div>
                  </div>
                  <span className="text-xs font-mono text-text-muted">92%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: My Work (66%) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white border border-border rounded-2xl shadow-sm p-0 flex flex-col overflow-hidden h-full">
              {/* Card Header & Tabs */}
              <div className="px-6 pt-6 pb-0 border-b border-border bg-white sticky top-0 z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-display font-bold text-text-main">My Work</h3>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-surface rounded-full text-text-muted hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">filter_list</span>
                    </button>
                  </div>
                </div>
                <div className="flex gap-8">
                  <button className="pb-3 text-sm font-medium text-text-muted hover:text-text-main transition-colors relative">
                    Overdue
                    <span className="ml-1.5 bg-error/10 text-error px-1.5 py-0.5 rounded text-xs font-bold">{myTasksOverdue.length}</span>
                  </button>
                  <button className="pb-3 text-sm font-medium text-primary border-b-2 border-primary transition-colors relative">
                    Assigned to Me
                    <span className="ml-1.5 bg-primary/10 text-primary px-1.5 py-0.5 rounded text-xs font-bold">{myTasks.length}</span>
                  </button>
                </div>
              </div>
              {/* Task List */}
              <div className="flex-1 flex flex-col">
                {myTasksOverdue.length > 0 && (
                   <>
                    <div className="px-6 py-4 bg-surface/30 mt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-error flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">warning</span> Overdue
                      </h4>
                    </div>
                    {myTasksOverdue.map(task => (
                        <div key={task.id}
                             onClick={() => setSelectedTask(task.id)}
                             className="group flex items-center gap-4 px-6 py-3 border-b border-border/50 hover:bg-surface/50 transition-colors cursor-pointer bg-error/5">
                           <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-text-main font-medium truncate group-hover:text-primary transition-colors">{task.title}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs">
                              <span className={`text-text-muted px-2 py-0.5 rounded-full font-medium border border-border`}>{task.status}</span>
                            </div>
                          </div>
                        </div>
                    ))}
                   </>
                )}

                <div className="px-6 py-4 bg-surface/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">assignment</span> All Tasks
                  </h4>
                </div>
                {displayTasks.length === 0 && (
                    <div className="p-8 text-center text-text-muted">No active tasks assigned to you.</div>
                )}
                {displayTasks.map(task => (
                    <div key={task.id}
                         onClick={() => setSelectedTask(task.id)}
                         className="group flex items-center gap-4 px-6 py-3 border-b border-border/50 hover:bg-surface/50 transition-colors cursor-pointer">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-text-main font-medium truncate group-hover:text-primary transition-colors">{task.title}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          {task.tags.map(tag => (
                             <span key={tag.id} className={`${tag.color} ${tag.textColor} px-2 py-0.5 rounded-full font-medium`}>{tag.name}</span>
                          ))}
                          <span className="text-text-muted">#{task.id}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-text-muted px-2 py-1">
                          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                          <span className="text-xs font-mono">{task.date || 'No Date'}</span>
                        </div>
                      </div>
                    </div>
                ))}

              </div>
              {/* Footer */}
              <div className="p-4 border-t border-border bg-surface/30">
                <button className="w-full py-2 flex items-center justify-center gap-2 text-primary font-bold text-sm hover:bg-primary/5 rounded-lg transition-colors">
                  <span className="material-symbols-outlined">add</span>
                  Add new task
                </button>
              </div>
            </div>
          </div>
          {/* Right Column: Inbox (33%) */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
              <div className="px-6 py-5 border-b border-border flex justify-between items-center bg-white">
                <h3 className="text-xl font-display font-bold text-text-main">Inbox</h3>
                <div className="flex gap-2">
                  <button className="text-xs font-bold uppercase text-primary hover:underline">Mark all read</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-2">

                {inboxActivities.length === 0 && (
                    <div className="p-8 flex flex-col items-center justify-center text-center opacity-60">
                      <div className="size-12 rounded-full bg-surface mb-3 flex items-center justify-center text-text-muted">
                        <span className="material-symbols-outlined">inbox</span>
                      </div>
                      <p className="text-sm text-text-muted">You're all caught up!</p>
                    </div>
                )}

                {inboxActivities.map(act => {
                    const { icon, color } = getActivityIcon(act.type);
                    return (
                        <div key={act.id} className="p-3 rounded-xl hover:bg-surface border border-transparent hover:border-border/50 transition-all cursor-pointer group">
                          <div className="flex gap-3">
                            <div className="relative shrink-0">
                              <img src={act.user.avatarUrl || 'https://via.placeholder.com/40'} className="size-10 rounded-full object-cover shadow-sm" alt={act.user.name} />
                              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                <div className={`${color} rounded-full p-0.5 text-white`}>
                                  <span className="material-symbols-outlined text-[10px] block">{icon}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1 overflow-hidden">
                              <p className="text-sm text-text-main leading-snug truncate">
                                <span className="font-bold">{act.user.name}</span> <span className="text-text-muted text-xs">on</span> <span className="font-medium text-primary hover:underline">{act.taskTitle || 'Task'}</span>
                              </p>
                              {act.details && <p className="text-xs text-text-muted truncate">"{act.details}"</p>}
                              <p className="text-xs text-text-muted font-mono">{formatActivityTime(act.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                    );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
