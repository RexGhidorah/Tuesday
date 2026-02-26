import { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';

export default function Workspaces() {
  const { workspaces, addWorkspace, deleteWorkspace, setActiveWorkspace, activeWorkspaceId } = useProjectStore();
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWorkspaceName.trim()) {
      addWorkspace(newWorkspaceName, 'bg-primary');
      setNewWorkspaceName('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-white shrink-0 z-10">
        <h2 className="text-2xl font-display font-bold text-text-main tracking-tight">Workspaces</h2>
      </header>

      {/* Content */}
      <div className="p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">

          {/* Create Section */}
          <div className="mb-10 bg-surface p-6 rounded-xl border border-border">
            <h3 className="text-lg font-bold text-text-main mb-4">Create New Workspace</h3>
            <form onSubmit={handleCreate} className="flex gap-4">
              <input
                type="text"
                placeholder="Workspace Name (e.g. Marketing Q4)"
                className="flex-1 rounded-lg border-border focus:ring-primary focus:border-primary"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
              />
              <button
                type="submit"
                disabled={!newWorkspaceName.trim()}
                className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover disabled:opacity-50 transition-colors"
              >
                Create
              </button>
            </form>
          </div>

          {/* List Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workspaces.map(ws => (
              <div
                key={ws.id}
                className={`p-6 rounded-xl border transition-all ${activeWorkspaceId === ws.id ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:shadow-md bg-white'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`size-12 rounded-lg ${ws.color} flex items-center justify-center text-white shadow-sm`}>
                    <span className="material-symbols-outlined text-2xl">{ws.icon || 'folder'}</span>
                  </div>
                  <div className="flex gap-2">
                     {activeWorkspaceId !== ws.id && (
                        <button
                            onClick={() => setActiveWorkspace(ws.id)}
                            className="text-sm font-medium text-primary hover:underline px-2 py-1"
                        >
                            Switch To
                        </button>
                     )}
                     <button
                        onClick={() => {
                            if(window.confirm(`Delete workspace "${ws.name}"?`)) deleteWorkspace(ws.id);
                        }}
                        className="text-muted hover:text-error p-1 rounded hover:bg-surface transition-colors"
                     >
                        <span className="material-symbols-outlined">delete</span>
                     </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text-main mb-1">{ws.name}</h3>
                <p className="text-sm text-muted">ID: {ws.id}</p>
                {activeWorkspaceId === ws.id && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success text-xs font-bold rounded-full">
                        <span className="size-2 bg-success rounded-full"></span>
                        Active
                    </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
