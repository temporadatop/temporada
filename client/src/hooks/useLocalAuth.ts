import { useState, useEffect } from 'react';
import { getCurrentUser, login as loginFn, logout as logoutFn, register as registerFn, type User } from '@/lib/auth';

export function useLocalAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar usuário atual
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = loginFn(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const register = async (data: Omit<User, 'id' | 'createdAt'>) => {
    const result = registerFn(data);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    logoutFn();
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
  };
}
