// src/services/http.ts
export const API_URL = (import.meta.env.VITE_API_URL ?? '/api').replace(/\/$/, '');
// -> Production (Vercel) sẽ là '/api' để đi qua function proxy
// -> Local có thể set .env.local: VITE_API_URL=http://localhost:3001

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? ((await res.json()) as T) : ((await res.text()) as T);
}

export const http = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: any) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body ?? {}) }),
  put: <T>(path: string, body?: any) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body ?? {}) }),
  patch: <T>(path: string, body?: any) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(body ?? {}) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
