// src/services/http.ts
export const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3001').replace(/\/$/, '');

async function request(path: string, init?: RequestInit) {
  const url = `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export const api = {
  get: <T = unknown>(p: string) => request(p) as Promise<T>,
  post: <T = unknown>(p: string, b: any) =>
    request(p, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(b),
    }) as Promise<T>,
  patch: <T = unknown>(p: string, b: any) =>
    request(p, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(b),
    }) as Promise<T>,
  del: (p: string) => request(p, { method: 'DELETE' }),
};
