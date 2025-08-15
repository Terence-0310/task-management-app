const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

type Cred = { username: string; password: string };

export async function login({ username, password }: Cred) {
  if (username.trim().length < 3) throw new Error('Username phải ≥ 3 ký tự');
  if (password.trim().length < 6) throw new Error('Mật khẩu phải ≥ 6 ký tự');

  const res = await fetch(
    `${API}/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const [user] = await res.json();
  if (!user) throw new Error('Sai thông tin đăng nhập');

  const token = `demo-${user.username}-${Date.now()}`;
  return { token, user: { id: user.id, username: user.username, role: user.role } };
}
