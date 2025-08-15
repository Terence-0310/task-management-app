// src/services/http.ts
export const API_URL = (import.meta.env.VITE_API_URL ?? '/api').replace(/\/$/, '');

// ví dụ đăng nhập:
export async function login(username: string, password: string) {
  const url = `${API_URL}/users?username=${encodeURIComponent(
    username
  )}&password=${encodeURIComponent(password)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('API error');
  return res.json();
}
