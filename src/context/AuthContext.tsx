import React, { createContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  userEmail: string | null;
  userId: string | null;
  login: (token: string, role: string, email: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    const userId = localStorage.getItem('userId');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserEmail(email);
      setUserId(userId);
    }
  }, []);

  const login = (token: string, role: string, email: string, userId: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('email', email);
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    setUserRole(role);
    setUserEmail(email);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userEmail, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;