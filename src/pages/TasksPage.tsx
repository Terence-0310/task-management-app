import { CalendarDays, CheckSquare } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Topbar from '../components/Topbar';
import { useAuth } from '../modules/auth/AuthContext';
import * as catAPI from '../services/categoryAPI';
import * as taskAPI from '../services/taskAPI';

type T = taskAPI.Task;
type C = catAPI.Category;

export default function TasksPage() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<T[]>([]);
  const [cats, setCats] = useState<C[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError('');
        const [ts, cs] = await Promise.all([taskAPI.list(), catAPI.list()]);
        setTasks(ts);
        setCats(cs);
      } catch {
        setError('Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const catMap = useMemo(() => {
    const m = new Map<number, C>();
    cats.forEach((c) => {
      if (typeof c.id === 'number') m.set(c.id, c);
    });
    return m;
  }, [cats]);

  async function onCreate(data: Partial<T>) {
    const created = await taskAPI.create({
      title: data.title!,
      description: data.description || '',
      status: (data.status as any) || 'todo',
      priority: (data.priority as any) || 'medium',
      dueDate: data.dueDate!,
      createdAt: new Date().toISOString(),
      createdBy: user!.id,
      categoryId: data.categoryId,
    });
    setTasks((s) => [created, ...s]);
  }

  async function onUpdateStatus(id: number, status: T['status']) {
    const updated = await taskAPI.update(id, { status });
    setTasks((s) => s.map((t) => (t.id === id ? updated : t)));
  }

  async function onDelete(id: number) {
    if (!confirm('Xóa nhiệm vụ này?')) return;
    await taskAPI.remove(id);
    setTasks((s) => s.filter((t) => t.id !== id));
  }

  return (
    <div className="dashboard">
      <Topbar username={user?.username ?? ''} role={user?.role ?? 'user'} onLogout={logout} />

      <main className="page">
        <div className="page-title">
          <div className="page-title-left">
            <CheckSquare className="mr-8" size={28} />
            <h2>
              Quản Lý Nhiệm Vụ <span>({tasks.length} nhiệm vụ)</span>
            </h2>
          </div>
        </div>

        <TaskForm onCreate={onCreate} categories={cats} />

        {error && (
          <div className="error" style={{ marginTop: 12 }}>
            {error}
          </div>
        )}

        {loading ? (
          <section className="grid" style={{ marginTop: 12 }}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </section>
        ) : tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <section className="grid" style={{ marginTop: 12 }}>
            {tasks.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                category={t.categoryId ? catMap.get(t.categoryId) : undefined}
                onChangeStatus={onUpdateStatus}
                onDelete={onDelete}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

/* ---------------- Sub-components ---------------- */

function TaskForm({
  onCreate,
  categories,
}: {
  onCreate: (t: Partial<T>) => void;
  categories: C[];
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<T['status']>('todo');
  const [priority, setPriority] = useState<T['priority']>('medium');
  const [dueDate, setDueDate] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');

  const canSubmit = title.trim().length >= 3 && !!dueDate;

  return (
    <form
      className="card form-card"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onCreate({
          title,
          description,
          status,
          priority,
          dueDate,
          categoryId: categoryId || undefined,
        });
        setTitle('');
        setDescription('');
        setStatus('todo');
        setPriority('medium');
        setDueDate('');
        setCategoryId('');
      }}
    >
      <h3 className="form-title">Thêm nhiệm vụ</h3>

      <div className="form-inline form-inline--with-cat">
        <input
          className="input"
          placeholder="Tiêu đề (≥ 3 ký tự)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input"
          placeholder="Mô tả (tuỳ chọn)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="select"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <option value="todo">Chờ xử lý</option>
          <option value="in-progress">Đang thực hiện</option>
          <option value="completed">Hoàn thành</option>
        </select>

        <select
          className="select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
        >
          <option value="low">Thấp</option>
          <option value="medium">Trung bình</option>
          <option value="high">Cao</option>
        </select>

        <select
          className="select"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : '')}
        >
          <option value="">— Danh mục —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id!}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="date-wrap">
          <input
            className="select date-input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <CalendarDays size={18} className="date-icon" aria-hidden />
        </div>

        <button className="btn btn-primary btn-add" type="submit" disabled={!canSubmit}>
          Thêm
        </button>
      </div>
    </form>
  );
}

/** Tính màu chữ (đen/trắng) cho chip theo nền */
function textOn(bg: string) {
  // chấp nhận #RGB/#RRGGBB
  let hex = bg.replace('#', '');
  if (hex.length === 3)
    hex = hex
      .split('')
      .map((x) => x + x)
      .join('');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  // luminance
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? '#0f172a' : '#fff';
}

function TaskCard({
  task,
  category,
  onChangeStatus,
  onDelete,
}: {
  task: T;
  category?: C;
  onChangeStatus: (id: number, s: T['status']) => void;
  onDelete: (id: number) => void;
}) {
  const statusColor =
    task.status === 'completed' ? 'success' : task.status === 'todo' ? 'warn' : 'info';
  const priorityColor =
    task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'muted' : 'info';

  const overdue =
    new Date(task.dueDate).getTime() < new Date(new Date().setHours(0, 0, 0, 0)).getTime() &&
    task.status !== 'completed';

  const chipStyle = category
    ? { background: category.color, borderColor: category.color, color: textOn(category.color) }
    : undefined;

  return (
    <article className={`card task-card hover-elevate status-${task.status}`}>
      <div className="card-head">
        <h3 className="card-title">{task.title}</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {category && (
            <span className="chip" style={chipStyle}>
              <span className="chip-dot" style={{ background: textOn(category.color) }} />
              {category.name}
            </span>
          )}
          <span className={`pill pill-${statusColor}`}>
            {task.status === 'todo'
              ? 'Chờ xử lý'
              : task.status === 'completed'
              ? 'Hoàn thành'
              : 'Đang thực hiện'}
          </span>
        </div>
      </div>

      <p className="card-desc">{task.description}</p>

      <div className="meta">
        <div className="meta-row">
          <span>Ưu tiên</span>
          <span className={`badge badge-${priorityColor}`}>
            {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
          </span>
        </div>
        <div className="meta-row">
          <span>Hạn</span>
          <strong className={overdue ? 'due-overdue' : ''}>{task.dueDate}</strong>
        </div>
      </div>

      <div className="divider" />

      <label className="label">Cập nhật trạng thái</label>
      <select
        className="select"
        value={task.status}
        onChange={(e) => onChangeStatus(task.id!, e.target.value as any)}
      >
        <option value="todo">Chờ xử lý</option>
        <option value="in-progress">Đang thực hiện</option>
        <option value="completed">Hoàn thành</option>
      </select>

      <div className="card-actions">
        <button className="btn" onClick={() => onDelete(task.id!)}>
          Xóa
        </button>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <article className="card skeleton">
      <div className="s-line w-60"></div>
      <div className="s-line w-80"></div>
      <div className="s-line w-40"></div>
      <div className="s-line w-70"></div>
    </article>
  );
}
function EmptyState() {
  return (
    <div className="card empty">
      <h3>Chưa có nhiệm vụ nào</h3>
      <p className="card-desc">Hãy thêm nhiệm vụ mới bằng form phía trên.</p>
    </div>
  );
}
