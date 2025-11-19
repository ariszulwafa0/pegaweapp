'use client';

import { useEffect, useState } from 'react';

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      // Check both localStorage and cookies
      const token = localStorage.getItem('adminToken') || 
                   document.cookie.split(';').find(c => c.trim().startsWith('admin-token='))?.split('=')[1];
      
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  const logout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem('adminToken');
      
      // Clear cookies via API
      await fetch('/api/admin/logout', {
        method: 'POST',
      });
      
      setIsAuthenticated(false);
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
      window.location.href = '/admin/login';
    }
  };

  return {
    isAuthenticated,
    loading,
    logout,
    checkAuth,
  };
}