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

export type UserInput = {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
};

export async function list() {
  return withAPI(async (API) => {
    const res = await fetch(`${API}/users`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  });
}
export async function create(u: UserInput) {
  if (!u.username || u.username.length < 3) throw new Error('Username tối thiểu 3 ký tự');
  if (!u.password || u.password.length < 6) throw new Error('Mật khẩu tối thiểu 6 ký tự');
  return withAPI(async (API) => {
    const res = await fetch(`${API}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(u),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  });
}
export async function remove(id: number) {
  return withAPI(async (API) => {
    const res = await fetch(`${API}/users/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  });
}
