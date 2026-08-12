import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateMockToken, decodeToken, isTokenExpired } from './jwtUtils';

export const MOCK_USERS = [
  { username: 'admin', password: 'admin123', role: 'Admin', name: 'Alice Admin' },
  { username: 'editor', password: 'editor123', role: 'Editor', name: 'Ed Editor' },
  { username: 'viewer', password: 'viewer123', role: 'Viewer', name: 'Valerie Viewer' },
];

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from stored token
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && !isTokenExpired(decoded)) {
        setUser({
          username: decoded.sub,
          role: decoded.role,
          name: decoded.name,
        });
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const foundUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: 'Invalid username or password' };
    }

    const token = generateMockToken(foundUser);
    localStorage.setItem('token', token);
    setUser({
      username: foundUser.username,
      role: foundUser.role,
      name: foundUser.name,
    });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, getAuthHeader, MOCK_USERS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
