const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export type Task = {
  id?: number;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdBy: number;
  createdAt: string;
  categoryId?: number;
};

export async function list() {
  const res = await fetch(`${API}/tasks?_sort=createdAt&_order=desc`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as Task[];
}

export async function create(t: Task) {
  const res = await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(t),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as Task;
}

export async function update(id: number, patch: Partial<Task>) {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as Task;
}

export async function remove(id: number) {
  const res = await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
