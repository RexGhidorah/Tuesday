import { Link, useLocation } from 'react-router-dom';
import { useProjectStore } from '../store/useProjectStore';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { workspaces, activeWorkspaceId, setActiveWorkspace, addWorkspace, deleteWorkspace } = useProjectStore();
  const { user, logout, organizations } = useAuth();
  const [isAddingWorkspace, setIsAddingWorkspace] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  // Basic org switcher - can be enhanced later
  // For now, we assume active org is handled via context or just first org
  // But store.fetchData needs orgId.
  // Let's add a local state or context for selectedOrgId?
  // Ideally AuthContext manages selectedOrgId or we pass it down.
  // We'll update Layout to handle org selection and pass currentOrgId if needed,
  // but Sidebar mainly deals with workspaces within an org.

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

        {/* Organization Switcher (Simple) */}
        {organizations.length > 1 && (
             <div className="mb-4 px-1">
                 <select
                    className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    onChange={(e) => {
                        // Ideally trigger a context update or reload
                        // For MVP: window.location.reload() or just a context setter passed down?
                        // We will rely on Layout to provide the setter if we lift state up,
                        // or AuthContext to store 'currentOrgId'.
                        // Let's just show the count for now or list them if we want to be fancy.
                        console.log("Switching orgs not fully wired in UI yet", e.target.value);
                    }}
                 >
                     {organizations.map(org => (
                         <option key={org.id} value={org.id}>{org.name}</option>
                     ))}
                 </select>
             </div>
        )}

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
          {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="User avatar" className="w-8 h-8 rounded-full object-cover border border-border" />
          ) : (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {user?.name?.charAt(0) || 'U'}
              </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-main truncate">{user?.name}</p>
            <p className="text-xs text-muted truncate">{user?.email}</p>
          </div>
          <button onClick={logout} className="text-muted hover:text-error transition-colors">
               <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
