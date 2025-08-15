import { CheckSquare, KeyRound, User2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../modules/auth/AuthContext';

function validate(u: string, p: string) {
  const e: Record<string, string> = {};
  if (!u.trim()) e.username = 'Vui lòng nhập username';
  else if (u.trim().length < 3) e.username = 'Tối thiểu 3 ký tự';
  if (!p.trim()) e.password = 'Vui lòng nhập mật khẩu';
  else if (p.trim().length < 6) e.password = 'Tối thiểu 6 ký tự';
  return e;
}

export default function LoginPage() {
  const { login } = useAuth();
  const [u, setU] = useState('admin');
  const [p, setP] = useState('123456');
  const [err, setErr] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');
    const errors = validate(u, p);
    setErr(errors);
    if (Object.keys(errors).length) return;
    try {
      await login(u, p);
      location.href = '/tasks';
    } catch (e: any) {
      setMsg(e.message || 'Đăng nhập thất bại');
    }
  }

  return (
    <div className="screen gradient-screen">
      <div className="auth-card">
        <div className="auth-logo">
          <CheckSquare size={42} />
        </div>
        <h1 className="title-hero">Hệ Thống Quản Lý</h1>
        <p className="subtitle">Đăng nhập để tiếp tục</p>

        <form className="form" onSubmit={onSubmit}>
          <label className="label">Tên đăng nhập</label>
          <input className="input" value={u} onChange={(e) => setU(e.target.value)} autoFocus />
          {err.username && <div className="error">{err.username}</div>}
          <label className="label">Mật khẩu</label>
          <input
            className="input"
            type="password"
            value={p}
            onChange={(e) => setP(e.target.value)}
          />
          {err.password && <div className="error">{err.password}</div>}
          {msg && <div className="error">{msg}</div>}
          <button className="btn btn-primary" type="submit">
            Đăng nhập
          </button>
        </form>

        <div className="demo-box">
          <div className="demo-title">
            <KeyRound size={18} />
            <span>Tài khoản demo</span>
          </div>
          <div className="demo-row">
            <User2 size={16} />
            <span>Admin:</span>
            <code className="code">admin</code>
            <span>/</span>
            <code className="code">123456</code>
          </div>
          <div className="demo-row">
            <User2 size={16} />
            <span>User:</span>
            <code className="code">user</code>
            <span>/</span>
            <code className="code">123456</code>
          </div>
        </div>
      </div>
    </div>
  );
}
