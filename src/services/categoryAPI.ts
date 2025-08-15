const FALLBACKS = [
  import.meta.env.VITE_API_URL,
  'http://localhost:3001',
  'http://127.0.0.1:3001',
].filter(Boolean) as string[];
async function withAPI<T>(cb: (API: string) => Promise<T>) {
  let e: any = null;
  for (const API of FALLBACKS) {
    try {
      return await cb(API);
    } catch (err) {
      e = err;
    }
  }
  throw e;
}

export type Category = { id?: number; name: string; color: string };

export async function list() {
  return withAPI(async (API) => {
    const res = await fetch(`${API}/categories`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  });
}
export async function create(c: Category) {
  if (!c.name?.trim()) throw new Error('Tên danh mục bắt buộc');
  return withAPI(async (API) => {
    const res = await fetch(`${API}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(c),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  });
}
export async function update(id: number, patch: Partial<Category>) {
  return withAPI(async (API) => {
    const res = await fetch(`${API}/categories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  });
}
export async function remove(id: number) {
  return withAPI(async (API) => {
    const res = await fetch(`${API}/categories/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  });
}
