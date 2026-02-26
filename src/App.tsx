import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProjectBoard from './pages/ProjectBoard';
import AdminUsers from './pages/AdminUsers';
import ActivityLog from './pages/ActivityLog';
import AdminSettings from './pages/AdminSettings';
import ProjectKanban from './pages/ProjectKanban';
import Dashboard from './pages/Dashboard';
import ProjectGantt from './pages/ProjectGantt';
import ProjectCalendar from './pages/ProjectCalendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProjectBoard />} />
          <Route path="/board" element={<ProjectBoard />} />
          <Route path="/kanban" element={<ProjectKanban />} />
          <Route path="/gantt" element={<ProjectGantt />} />
          <Route path="/calendar" element={<ProjectCalendar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/activity" element={<ActivityLog />} />

          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
