import { useState } from 'react';
import { authAPI } from '../../api/authAPI';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await authAPI.login(formData.username, formData.password);

    if (result.success) {
      onLogin(result.user);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="login-form">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên đăng nhập:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {'}'}
        <button type="submit" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
      <div className="demo-accounts">
        <p>Tài khoản demo:</p>
        <p>Admin: admin / 123456</p>
        <p>User: user / 123456</p>
      </div>
    </div>
  );
};

export default LoginForm;
