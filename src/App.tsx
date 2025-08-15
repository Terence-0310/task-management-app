import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuth } from './modules/auth/AuthContext';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';

function Protected({ children }: { children: JSX.Element }) {
  const { token, loading } = useAuth();
  if (loading) return <div className="screen">Đang tải…</div>;
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
function AdminOnly({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (user?.role !== 'admin') return <Navigate to="/tasks" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/tasks"
        element={
          <Protected>
            <TasksPage />
          </Protected>
        }
      />
      <Route
        path="/users"
        element={
          <Protected>
            <AdminOnly>
              <UsersPage />
            </AdminOnly>
          </Protected>
        }
      />
      <Route
        path="/categories"
        element={
          <Protected>
            <AdminOnly>
              <CategoriesPage />
            </AdminOnly>
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/tasks" replace />} />
    </Routes>
  );
}
