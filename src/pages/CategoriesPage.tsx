import { useEffect, useState } from 'react';
import Topbar from '../components/Topbar';
import { useAuth } from '../modules/auth/AuthContext';
import * as catAPI from '../services/categoryAPI'; // ✅ ĐÚNG service

type C = catAPI.Category;

export default function CategoriesPage() {
  const { user, logout } = useAuth();
  const [list, setList] = useState<C[]>([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3498db');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setList(await catAPI.list());
      } catch {
        setErr('Không tải được danh mục');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const created = await catAPI.create({ name, color });
    setList((s) => [...s, created]);
    setName('');
  }
  async function remove(id: number) {
    if (!confirm('Xóa danh mục?')) return;
    await catAPI.remove(id);
    setList((s) => s.filter((c) => c.id !== id));
  }
  async function changeColor(c: C, val: string) {
    const updated = await catAPI.update(c.id!, { color: val }); // ✅ đúng 'update' từ categoryAPI
    setList((s) => s.map((x) => (x.id === c.id ? updated : x)));
  }

  return (
    <div className="dashboard">
      <Topbar username={user!.username} role={user!.role} onLogout={logout} />
      <main className="page">
        <h2>Danh Mục</h2>

        <form className="card" onSubmit={add}>
          <h3 style={{ marginTop: 0 }}>Thêm danh mục</h3>
          <div className="meta">
            <input
              className="input"
              placeholder="Tên danh mục"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="select"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
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
          {list.map((c) => (
            <article key={c.id} className="card">
              <div className="card-head">
                <h3 className="card-title">{c.name}</h3>
                <span
                  className="pill"
                  style={{ background: c.color, color: '#fff', borderColor: c.color }}
                >
                  Màu
                </span>
              </div>
              <div className="meta">
                <label className="label">Đổi màu:</label>
                <input
                  className="select"
                  type="color"
                  value={c.color}
                  onChange={(e) => changeColor(c, e.target.value)}
                />
              </div>
              <div className="divider" />
              <button className="btn" onClick={() => remove(c.id!)}>
                Xóa
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
