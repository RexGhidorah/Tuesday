import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TaskDetailPanel from './TaskDetailPanel';

export default function Layout() {
  return (
    <div className="flex h-screen bg-white overflow-hidden relative">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Outlet />
      </main>

      {/* Global Task Detail Panel */}
      <TaskDetailPanel />
    </div>
  );
}
