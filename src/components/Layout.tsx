import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TaskDetailPanel from './TaskDetailPanel';
import { useAuth } from '../context/AuthContext';
import { useProjectStore } from '../store/useProjectStore';
import { useEffect, useState } from 'react';

export default function Layout() {
  const { user, organizations } = useAuth();
  const { fetchData, setCurrentUser, isLoading, error } = useProjectStore();
  const [activeOrgId, setActiveOrgId] = useState<string>('');

  useEffect(() => {
    if (user) {
        setCurrentUser(user);
    }

    // Default to first org if available and none selected
    if (organizations.length > 0 && !activeOrgId) {
        setActiveOrgId(organizations[0].id);
    }
  }, [user, organizations, setCurrentUser, activeOrgId]);

  useEffect(() => {
      if (activeOrgId) {
          fetchData(activeOrgId);
      }
  }, [activeOrgId, fetchData]);

  if (isLoading) {
      return <div className="flex items-center justify-center h-screen">Loading project data...</div>;
  }

  if (error) {
      return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden relative">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Simple Org Switcher / Header can go here if needed, but Sidebar has it now too */}
        <Outlet />
      </main>

      {/* Global Task Detail Panel */}
      <TaskDetailPanel />
    </div>
  );
}
