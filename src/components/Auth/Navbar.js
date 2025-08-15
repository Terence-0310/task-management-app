import { authAPI } from '../../api/authAPI';

const Navbar = ({ user, onLogout }) => {
  const handleLogout = () => {
    authAPI.logout();
    onLogout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo">✅</span>
        <h1>Task Manager</h1>
      </div>
      <div className="navbar-user">
        <span className="user-info">
          Xin chào, <strong>{user.username}</strong>
          <span className={`role-badge ${user.role}`}>
            {user.role === 'admin' ? 'Admin' : 'User'}
          </span>
        </span>
        <button onClick={handleLogout} className="logout-btn">
          Đăng xuất
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
