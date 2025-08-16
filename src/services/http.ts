// src/services/http.ts
export const API_URL = import.meta.env.VITE_API_URL || '/api';

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

const http = {
  get: (p: string) => request(p),
  post: (p: string, data?: any) => request(p, { method: 'POST', body: JSON.stringify(data) }),
  put: (p: string, data?: any) => request(p, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (p: string, data?: any) => request(p, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (p: string) => request(p, { method: 'DELETE' }),
};

export default http;
