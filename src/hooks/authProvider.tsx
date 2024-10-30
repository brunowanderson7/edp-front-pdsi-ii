'use client'

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode
} from 'react';

interface AuthContextProps {
  token: string;
  updateToken: (newToken: string) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  token: '',
  updateToken: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialToken = localStorage.getItem('token') || '';
    setToken(initialToken);
    setLoading(false);
  }, []);

  const updateToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  return (
    <AuthContext.Provider value={{ token, updateToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
