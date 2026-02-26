import { useProjectStore } from "../store/useProjectStore";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import type { Activity } from "../types";

export default function ActivityLog() {
  const { activities } = useProjectStore();

  // Group activities by date
  const groupedActivities = activities.reduce((acc, activity) => {
    const date = parseISO(activity.timestamp);
    let key = format(date, 'yyyy-MM-dd');

    if (isToday(date)) key = 'Today';
    else if (isYesterday(date)) key = 'Yesterday';
    else key = format(date, 'MMM dd, yyyy');

    if (!acc[key]) acc[key] = [];
    acc[key].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  const getStatusColor = (status: string) => {
     switch(status) {
         case 'done': return 'bg-success';
         case 'working': return 'bg-warning';
         case 'stuck': return 'bg-error';
         case 'backlog': return 'bg-info';
         default: return 'bg-gray-400';
     }
  }

  const renderActivityContent = (act: Activity) => {
    switch(act.type) {
        case 'status_change':
            return (
                <p className="text-sm text-text-main leading-relaxed">
                    <span className="font-bold">{act.user.name}</span>
                    <span className="text-text-muted"> updated status on </span>
                    <span className="font-medium text-primary hover:underline decoration-primary/30 underline-offset-2 cursor-pointer">{act.taskTitle}</span>
                    <span className="text-text-muted"> to </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(act.meta?.newStatus)} text-white shadow-sm ml-1 uppercase`}>
                      {act.meta?.newStatus}
                    </span>
                </p>
            );
        case 'comment':
            return (
                 <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-main leading-relaxed">
                        <span className="font-bold">{act.user.name}</span>
                        <span className="text-text-muted"> commented on </span>
                        <span className="font-medium text-primary hover:underline decoration-primary/30 underline-offset-2 cursor-pointer">{act.taskTitle}</span>
                    </p>
                    <div className="mt-3 relative bg-surface p-3.5 rounded-2xl rounded-tl-none border border-border/50 text-sm text-text-main shadow-subtle max-w-[90%]">
                        <p>{act.details}</p>
                    </div>
                 </div>
            );
        case 'create_task':
            return (
                <p className="text-sm text-text-main leading-relaxed">
                    <span className="font-bold">{act.user.name}</span>
                    <span className="text-text-muted"> created task </span>
                    <span className="font-medium text-primary hover:underline decoration-primary/30 underline-offset-2 cursor-pointer">{act.taskTitle}</span>
                </p>
            );
        case 'upload_file':
            return (
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-main leading-relaxed">
                        <span className="font-bold">{act.user.name}</span>
                        <span className="text-text-muted"> uploaded file to </span>
                        <span className="font-medium text-primary hover:underline decoration-primary/30 underline-offset-2 cursor-pointer">{act.taskTitle}</span>
                    </p>
                    <div className="mt-3 flex items-center gap-3 p-3 bg-surface rounded-xl border border-border w-fit hover:bg-white hover:shadow-subtle hover:border-primary/30 transition-all cursor-pointer group/file">
                      <div className="size-10 bg-[#ea4c1d]/10 rounded-lg flex items-center justify-center text-[#ea4c1d]">
                        <span className="material-symbols-outlined">description</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-text-main group-hover/file:text-primary transition-colors">{act.details}</span>
                        <span className="text-xs text-text-muted">File</span>
                      </div>
                    </div>
                </div>
            );
        case 'mention':
             return (
                <p className="text-sm text-text-main leading-relaxed">
                    <span className="font-bold">{act.user.name}</span>
                    <span className="text-text-muted"> mentioned you in </span>
                    <span className="font-medium text-primary hover:underline decoration-primary/30 underline-offset-2 cursor-pointer">{act.taskTitle}</span>
                    <span className="text-text-muted">: "{act.details}"</span>
                </p>
            );
        default:
            return <p className="text-sm text-text-main">{act.details}</p>;
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
        case 'status_change': return { icon: 'check', color: 'bg-success' }; // Or dynamic based on status
        case 'comment': return { icon: 'chat_bubble', color: 'bg-info' };
        case 'create_task': return { icon: 'add', color: 'bg-primary' };
        case 'upload_file': return { icon: 'upload_file', color: 'bg-warning' };
        case 'mention': return { icon: 'alternate_email', color: 'bg-primary' };
        default: return { icon: 'notifications', color: 'bg-gray-400' };
    }
  };


  return (
    <div className="flex-1 overflow-y-auto w-full px-4 py-8 sm:px-6">
      <div className="max-w-[680px] mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-main mb-6 tracking-tight">Activity Log</h2>
          {/* Filters */}
          <div className="inline-flex items-center p-1 bg-surface rounded-xl border border-border">
            <button className="px-5 py-2 rounded-lg text-sm font-semibold bg-white text-text-main shadow-sm transition-all hover:text-primary">
              All Activities
            </button>
            <button className="px-5 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-text-main hover:bg-white/50 transition-all">
              Mentions Only
            </button>
            <button className="px-5 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-text-main hover:bg-white/50 transition-all">
              Files
            </button>
          </div>
        </div>

        {/* Activity Stream */}
        <div className="space-y-8 relative">
          {/* Timeline Connector (Visual Spine) */}
          <div className="absolute left-6 top-10 bottom-10 w-px bg-border/50 -z-10 hidden sm:block"></div>

          {Object.entries(groupedActivities).map(([dateLabel, acts]) => (
             <section key={dateLabel}>
                <div className="sticky top-[0px] z-10 bg-white/95 backdrop-blur py-3 mb-4 border-b border-surface">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-lg text-text-main">{dateLabel}</span>
                    <span className="text-xs font-medium text-text-muted bg-surface px-2 py-0.5 rounded-full border border-border">
                        {dateLabel === 'Today' ? format(new Date(), 'MMM dd') : ''}
                        {dateLabel === 'Yesterday' ? format(new Date(new Date().setDate(new Date().getDate() -1)), 'MMM dd') : ''}
                        {!['Today', 'Yesterday'].includes(dateLabel) ? dateLabel : ''}
                    </span>
                  </div>
                </div>

                {acts.map(act => {
                    const { icon, color } = getActivityIcon(act.type);
                    return (
                        <div key={act.id} className="group relative flex gap-4 p-3 rounded-2xl hover:bg-surface/50 transition-colors mb-2">
                          <div className="flex-shrink-0 relative">
                            <img src={act.user.avatarUrl || 'https://via.placeholder.com/40'} alt={act.user.name} className="size-10 rounded-full object-cover border-2 border-white shadow-sm" />
                            <div className={`absolute -bottom-1 -right-1 ${color} size-4 rounded-full border-2 border-white flex items-center justify-center`}>
                              <span className="material-symbols-outlined text-[10px] text-white font-bold">{icon}</span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex items-baseline justify-between gap-2">
                               {renderActivityContent(act)}
                              <span className="text-xs font-mono text-text-muted whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">
                                {format(parseISO(act.timestamp), 'h:mm a')}
                              </span>
                            </div>
                            {/* Hover Actions */}
                            <div className="mt-2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button className="text-xs font-medium text-text-muted hover:text-primary flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">reply</span> Reply
                              </button>
                              <button className="text-xs font-medium text-text-muted hover:text-error flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">favorite</span> Like
                              </button>
                            </div>
                          </div>
                        </div>
                    );
                })}
             </section>
          ))}

          {/* End of Stream Indicator */}
          <div className="pt-8 pb-16 flex justify-center">
            <span className="text-xs font-mono text-text-muted uppercase tracking-widest opacity-50">End of Activity</span>
          </div>
        </div>
      </div>
    </div>
  );
}
