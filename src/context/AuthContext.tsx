import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios'; // Fix import path if needed
import { User, Organization } from '../types';

interface AuthContextType {
  user: User | null;
  organizations: Organization[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User, orgs: Organization[]) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
      try {
          const res = await axios.get('/auth/me');
          setUser(res.data.user);
          setOrganizations(res.data.organizations);
          setIsAuthenticated(true);
      } catch (err) {
          console.error("Auth check failed", err);
          logout();
      }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        refreshUser().finally(() => setIsLoading(false));
    } else {
        setIsLoading(false);
    }
  }, []);

  const login = (token: string, userData: User, orgs: Organization[]) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setOrganizations(orgs);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setOrganizations([]);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, organizations, isAuthenticated, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
