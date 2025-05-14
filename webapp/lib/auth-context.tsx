'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '@/lib/types';
import { getFarmerDashboardData, getBuyerDashboardData, getLogisticsDashboardData } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if we have a user in local storage
    const storedUser = localStorage.getItem('agrilink_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string,
    //  password: string
    ) => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any email/password combination works
      // In a real app, this would validate against a backend
      
      // Create a mock user based on email pattern
      let role: UserRole = 'farmer';
      let dashboardData: ReturnType<typeof getFarmerDashboardData> | ReturnType<typeof getBuyerDashboardData> | ReturnType<typeof getLogisticsDashboardData> = {} as ReturnType<typeof getFarmerDashboardData>;
      
      if (email.includes('buyer')) {
        role = 'buyer';
        dashboardData = getBuyerDashboardData();
      } else if (email.includes('logistics')) {
        role = 'logistics';
        dashboardData = getLogisticsDashboardData();
      } else {
        dashboardData = getFarmerDashboardData();
      }
      
      const mockUser: User = {
        id: '123456',
        name: email.split('@')[0],
        email,
        role,
        location: 'Lagos, Nigeria',
        phoneNumber: '+234123456789',
        createdAt: new Date().toISOString(),
        profileComplete: true,
        avatarUrl: null,
        dashboardData
      };
      
      setUser(mockUser);
      localStorage.setItem('agrilink_user', JSON.stringify(mockUser));
      router.push(`/dashboard/${role}`);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>, 
    // password: string
  ) => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock user
      const role = userData.role || 'farmer';
      let dashboardData:  ReturnType<typeof getFarmerDashboardData> | ReturnType<typeof getBuyerDashboardData> | ReturnType<typeof getLogisticsDashboardData> = {} as ReturnType<typeof getFarmerDashboardData>;;
      
      if (role === 'buyer') {
        dashboardData = getBuyerDashboardData();
      } else if (role === 'logistics') {
        dashboardData = getLogisticsDashboardData();
      } else {
        dashboardData = getFarmerDashboardData();
      }
      
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        name: userData.name || '',
        email: userData.email || '',
        role: role,
        location: userData.location || 'Lagos, Nigeria',
        phoneNumber: userData.phoneNumber || '',
        createdAt: new Date().toISOString(),
        profileComplete: false,
        avatarUrl: null,
        dashboardData
      };
      
      setUser(mockUser);
      localStorage.setItem('agrilink_user', JSON.stringify(mockUser));
      
      // Redirect to profile completion or dashboard
      if (!mockUser.profileComplete) {
        router.push(`/profile/setup`);
      } else {
        router.push(`/dashboard/${role}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agrilink_user');
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}