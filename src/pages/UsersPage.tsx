import { useEffect, useState } from 'react';
import Topbar from '../components/Topbar';
import { useAuth } from '../modules/auth/AuthContext';
import * as usersAPI from '../services/usersAPI'; // ✅ ĐÚNG đường dẫn

type U = usersAPI.UserInput & { id: number };

export default function UsersPage() {
  const { user, logout } = useAuth();
  const [list, setList] = useState<U[]>([]);
  const [form, setForm] = useState<usersAPI.UserInput>({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setList(await usersAPI.list());
      } catch {
        setErr('Không tải được danh sách người dùng');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    try {
      const created = await usersAPI.create(form);
      setList((s) => [...s, created]);
      setForm({ username: '', email: '', password: '', role: 'user' });
    } catch (e: any) {
      alert(e.message || 'Lỗi tạo user');
    }
  }
  async function remove(id: number) {
    if (!confirm('Xóa người dùng?')) return;
    await usersAPI.remove(id);
    setList((s) => s.filter((u) => u.id !== id));
  }

  return (
    <div className="dashboard">
      <Topbar username={user!.username} role={user!.role} onLogout={logout} />
      <main className="page">
        <h2>Người Dùng</h2>

        <form className="card" onSubmit={add}>
          <h3 style={{ marginTop: 0 }}>Thêm người dùng</h3>
          <div className="meta">
            <input
              className="input"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm((f: usersAPI.UserInput) => ({ ...f, username: e.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm((f: usersAPI.UserInput) => ({ ...f, email: e.target.value }))
              }
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <input
                className="input"
                type="password"
                placeholder="Mật khẩu"
                value={form.password}
                onChange={(e) =>
                  setForm((f: usersAPI.UserInput) => ({ ...f, password: e.target.value }))
                }
              />
              <select
                className="select"
                value={form.role}
                onChange={(e) =>
                  setForm((f: usersAPI.UserInput) => ({ ...f, role: e.target.value as any }))
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <button className="btn btn-primary" type="submit">
              Thêm
            </button>
          </div>
        </form>

        {loading && <div>Đang tải…</div>}
        {err && <div className="error">{err}</div>}

        <section className="grid" style={{ marginTop: 12 }}>
          {list.map((u) => (
            <article key={u.id} className="card">
              <div className="card-head">
                <h3 className="card-title">{u.username}</h3>
                <span className={`pill ${u.role === 'admin' ? 'pill-info' : 'pill-success'}`}>
                  {u.role}
                </span>
              </div>
              <p className="card-desc">{u.email}</p>
              <div className="divider" />
              <button className="btn" onClick={() => remove(u.id)}>
                Xóa
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
