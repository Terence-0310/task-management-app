import { CheckSquare, FolderClosed, LogOut, Users2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Topbar({
  username,
  role,
  onLogout,
}: {
  username: string;
  role: 'admin' | 'user';
  onLogout: () => void;
}) {
  return (
    <header className="topbar">
      <div className="left">
        <div className="brand">
          <CheckSquare size={28} />
          <div className="brand-text">
            <strong>Hệ Thống Quản Lý</strong>
            <span>Quản lý nhiệm vụ hiệu quả</span>
          </div>
        </div>

        <nav className="tabs">
          <NavLink to="/tasks" className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}>
            <CheckSquare size={18} />
            <span>Nhiệm Vụ</span>
          </NavLink>

          {/* Chỉ admin mới truy cập Users/Categories; vẫn hiển thị link nhưng nếu click mà không có quyền sẽ bị route chặn */}
          <NavLink
            to="/users"
            className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
            title={role !== 'admin' ? 'Chỉ dành cho Admin' : ''}
          >
            <Users2 size={18} />
            <span>Người Dùng</span>
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}
            title={role !== 'admin' ? 'Chỉ dành cho Admin' : ''}
          >
            <FolderClosed size={18} />
            <span>Danh Mục</span>
          </NavLink>
        </nav>
      </div>

      <div className="right">
        <div className="welcome">
          Xin chào, <strong>{username}</strong>
          <span className={`badge role-${role}`}>{role === 'admin' ? 'Admin' : 'User'}</span>
        </div>
        <button className="btn btn-danger" onClick={onLogout}>
          <LogOut size={16} /> Đăng Xuất
        </button>
      </div>
    </header>
  );
}
