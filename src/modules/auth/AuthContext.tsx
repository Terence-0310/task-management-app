import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as authAPI from '../../services/authAPI';

type Role = 'admin' | 'user';
type User = { id: number; username: string; role: Role };
type AuthState = { user: User | null; token: string | null; loading: boolean };
type Ctx = AuthState & { login: (u: string, p: string) => Promise<void>; logout: () => void };

const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, token: null, loading: true });

  useEffect(() => {
    const raw = localStorage.getItem('auth');
    if (raw) setState({ ...JSON.parse(raw), loading: false });
    else setState((s) => ({ ...s, loading: false }));
  }, []);

  async function login(username: string, password: string) {
    const { token, user } = await authAPI.login({ username, password });
    const next = { token, user, loading: false };
    localStorage.setItem('auth', JSON.stringify(next));
    setState(next);
  }
  function logout() {
    localStorage.removeItem('auth');
    setState({ user: null, token: null, loading: false });
  }

  const value = useMemo(() => ({ ...state, login, logout }), [state]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
