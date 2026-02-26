import { Link, useLocation } from 'react-router-dom';
import { useProjectStore } from '../store/useProjectStore';
import { useState } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const { workspaces, activeWorkspaceId, setActiveWorkspace, addWorkspace, deleteWorkspace } = useProjectStore();
  const [isAddingWorkspace, setIsAddingWorkspace] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  const isActive = (path: string) => location.pathname === path;

  const handleAddWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWorkspaceName.trim()) {
      addWorkspace(newWorkspaceName, 'bg-primary');
      setNewWorkspaceName('');
      setIsAddingWorkspace(false);
    }
  };

  return (
    <aside className="w-[280px] flex-shrink-0 bg-white border-r border-border h-full flex flex-col z-20">
      {/* Sidebar Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/10 rounded-lg p-2">
            <span className="material-symbols-outlined text-primary text-3xl">grid_view</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-text-main tracking-tight">Tuesday</h1>
            <p className="text-xs text-muted font-medium">Prism Flow OS v2.4</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white h-10 rounded-full font-bold text-sm transition-colors shadow-sm mb-6">
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>New Item</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 overflow-y-auto space-y-1">

        {/* Workspaces Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-4 mb-2">
             <p className="text-xs font-bold text-muted uppercase tracking-wider font-display">Workspaces</p>
             <button
                onClick={() => setIsAddingWorkspace(!isAddingWorkspace)}
                className="text-muted hover:text-primary transition-colors"
             >
                <span className="material-symbols-outlined text-[16px]">add</span>
             </button>
          </div>

          {isAddingWorkspace && (
            <form onSubmit={handleAddWorkspace} className="px-4 mb-2">
              <input
                autoFocus
                type="text"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                placeholder="Workspace Name..."
                className="w-full text-sm px-2 py-1 border border-border rounded focus:border-primary focus:ring-0"
                onBlur={() => !newWorkspaceName && setIsAddingWorkspace(false)}
              />
            </form>
          )}

          {workspaces.map(ws => (
             <div
                key={ws.id}
                onClick={() => setActiveWorkspace(ws.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium group transition-colors cursor-pointer relative ${activeWorkspaceId === ws.id ? 'bg-primary/5 text-text-main' : 'text-muted hover:bg-surface hover:text-text-main'}`}
             >
                <span className={`material-symbols-outlined group-hover:scale-110 transition-transform ${activeWorkspaceId === ws.id ? 'text-primary' : 'text-muted group-hover:text-text-main'}`}>
                    {ws.icon || 'folder'}
                </span>
                <span className="truncate flex-1">{ws.name}</span>

                {/* Delete Action (visible on hover, keep default workspaces safe ideally, but allowing delete for now) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if(window.confirm('Delete this workspace?')) deleteWorkspace(ws.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white rounded-full text-muted hover:text-error transition-all"
                >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                </button>
             </div>
          ))}
        </div>

        {/* Global Views */}
        <div className="mb-6">
          <p className="px-4 text-xs font-bold text-muted uppercase tracking-wider mb-2 font-display">Views</p>
          <Link to="/" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/') ? 'bg-primary/5 text-text-main' : 'text-muted hover:bg-surface hover:text-text-main'}`}>
            <span className={`material-symbols-outlined group-hover:scale-110 transition-transform ${isActive('/') ? 'text-primary' : 'text-muted group-hover:text-text-main'}`}>table_chart</span>
            Main Table
          </Link>
          <Link to="/kanban" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/kanban') ? 'bg-primary/5 text-text-main' : 'text-muted hover:bg-surface hover:text-text-main'}`}>
            <span className={`material-symbols-outlined group-hover:scale-110 transition-transform ${isActive('/kanban') ? 'text-primary' : 'text-muted group-hover:text-text-main'}`}>view_kanban</span>
            Kanban
          </Link>
          <Link to="/gantt" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/gantt') ? 'bg-primary/5 text-text-main' : 'text-muted hover:bg-surface hover:text-text-main'}`}>
            <span className={`material-symbols-outlined group-hover:scale-110 transition-transform ${isActive('/gantt') ? 'text-primary' : 'text-muted group-hover:text-text-main'}`}>bar_chart</span>
            Gantt
          </Link>
          <Link to="/calendar" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/calendar') ? 'bg-primary/5 text-text-main' : 'text-muted hover:bg-surface hover:text-text-main'}`}>
            <span className={`material-symbols-outlined group-hover:scale-110 transition-transform ${isActive('/calendar') ? 'text-primary' : 'text-muted group-hover:text-text-main'}`}>calendar_month</span>
            Calendar
          </Link>
          <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/dashboard') ? 'bg-primary/5 text-text-main' : 'text-muted hover:bg-surface hover:text-text-main'}`}>
             <span className={`material-symbols-outlined group-hover:scale-110 transition-transform ${isActive('/dashboard') ? 'text-primary' : 'text-muted group-hover:text-text-main'}`}>dashboard</span>
             Dashboard
          </Link>
          <Link to="/activity" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/activity') ? 'bg-primary/5 text-text-main' : 'text-muted hover:bg-surface hover:text-text-main'}`}>
            <span className={`material-symbols-outlined group-hover:scale-110 transition-transform ${isActive('/activity') ? 'text-primary' : 'text-muted group-hover:text-text-main'}`}>history</span>
            Activity Log
          </Link>
        </div>

        <div className="mb-6">
           <p className="px-4 text-xs font-bold text-muted uppercase tracking-wider mb-2 font-display">Admin Console</p>
           <Link to="/admin/users" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/admin/users') ? 'bg-primary/5 text-text-main' : 'text-muted hover:bg-surface hover:text-text-main'}`}>
            <span className={`material-symbols-outlined group-hover:scale-110 transition-transform ${isActive('/admin/users') ? 'text-primary' : 'text-muted group-hover:text-text-main'}`}>group</span>
            Users
          </Link>
           <Link to="/admin/settings" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium group transition-colors ${isActive('/admin/settings') ? 'bg-primary/5 text-text-main' : 'text-muted hover:bg-surface hover:text-text-main'}`}>
            <span className={`material-symbols-outlined group-hover:scale-110 transition-transform ${isActive('/admin/settings') ? 'text-primary' : 'text-muted group-hover:text-text-main'}`}>settings</span>
            Settings
          </Link>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-border mt-auto">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-surface cursor-pointer">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa9MMPJIVdMBHZUt_fKo9nMVfv6Us7ryUGIspT5EMV5QSMZnJhFFRQAe4PZfab9Wt8KWENTWhTyvLYzVPB6z-WTzvGIytnj9-ywyzlPR-R2r4CxVf4WMiyltAzAzpkb9HsR6I0sn3nJnbX7zzQa0sZ62IyLM9CUKFe4j6J1m20sylNcZKQsBa4tEhIwmeJ6x7y70hGgxLjn29Pgho-q5YHyZCbGFs8CJuKwdMlh8BEzd8c0LQVjXDX0_IP2ttkiCnCLR1LpYcVNE1n" alt="User avatar" className="w-8 h-8 rounded-full object-cover border border-border" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-main truncate">Sarah Connor</p>
            <p className="text-xs text-muted truncate">Engineering Lead</p>
          </div>
          <span className="material-symbols-outlined text-muted text-[20px]">settings</span>
        </div>
      </div>
    </aside>
  );
}
