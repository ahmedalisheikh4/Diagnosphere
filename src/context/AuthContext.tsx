
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '@/services/api';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          const userData = await authAPI.getCurrentUser();
          setUser(userData);
        } catch (error: any) {
          console.error('Authentication check failed:', error.message);
          localStorage.removeItem('auth_token');
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Redirect unauthenticated users from protected routes
  useEffect(() => {
    if (!isLoading && !user) {
      const protectedRoutes = ['/skin-check', '/diagnosis-results', '/dashboard'];
      const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));
      
      if (isProtectedRoute) {
        toast.error('Please log in to access this page');
        navigate('/login', { state: { from: location.pathname } });
      }
    }
  }, [user, isLoading, navigate, location.pathname]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('auth_token', response.token);
      setUser(response.user);
      toast.success('Login successful!');
      
      // Redirect to the page they were trying to access or dashboard
      const from = location.state?.from || '/dashboard';
      navigate(from);
    } catch (error: any) {
      console.error('Login failed:', error);
      // Display specific error message
      if (error.message === "Cannot connect to server. Please make sure the backend is running.") {
        toast.error("Server connection failed. Please make sure the backend server is running.");
      } else if (error.message.includes("Invalid credentials")) {
        toast.error("Invalid email or password. Please try again.");
      } else if (error.message.includes("not found")) {
        toast.error("Account not found. Please check your email or sign up.");
      } else {
        toast.error(error.message || 'Failed to log in. Please try again.');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.register(name, email, password);
      localStorage.setItem('auth_token', response.token);
      setUser(response.user);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration failed:', error);
      // Display specific error message
      if (error.message === "Cannot connect to server. Please make sure the backend is running.") {
        toast.error("Server connection failed. Please make sure the backend server is running.");
      } else if (error.message.includes("already exists")) {
        toast.error("Email already registered. Please use a different email or log in.");
      } else if (error.message.includes("validation")) {
        toast.error("Invalid registration data. Please check your inputs.");
      } else {
        toast.error(error.message || 'Failed to create account. Please try again.');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authAPI.logout();
      localStorage.removeItem('auth_token');
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error: any) {
      console.error('Logout failed:', error);
      // Even if the server request fails, we'll still log the user out locally
      localStorage.removeItem('auth_token');
      setUser(null);
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
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
