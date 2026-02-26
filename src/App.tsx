import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import ProjectBoard from './pages/ProjectBoard';
import AdminUsers from './pages/AdminUsers';
import ActivityLog from './pages/ActivityLog';
import AdminSettings from './pages/AdminSettings';
import ProjectKanban from './pages/ProjectKanban';
import Dashboard from './pages/Dashboard';
import ProjectGantt from './pages/ProjectGantt';
import ProjectCalendar from './pages/ProjectCalendar';
import Workspaces from './pages/Workspaces';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
           <Route path="/onboarding" element={<Onboarding />} />

           <Route element={<Layout />}>
              <Route path="/" element={<ProjectBoard />} />
              <Route path="/board" element={<ProjectBoard />} />
              <Route path="/kanban" element={<ProjectKanban />} />
              <Route path="/gantt" element={<ProjectGantt />} />
              <Route path="/calendar" element={<ProjectCalendar />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/activity" element={<ActivityLog />} />
              <Route path="/workspaces" element={<Workspaces />} />

              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/settings" element={<AdminSettings />} />

              <Route path="*" element={<Navigate to="/" replace />} />
           </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
