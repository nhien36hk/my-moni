import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import { useBudgetStore } from '../../store/useBudgetStore';
import { useAuth } from '../../context/AuthContext';

export default function Layout() {
  const { isAuthenticated } = useAuth();
  const { fetchBudgets } = useBudgetStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchBudgets();
    }
  }, [isAuthenticated, fetchBudgets]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />

      {/* Page Content */}
      <main className="flex-1 w-full px-4 pb-24 pt-4 md:pb-12 md:px-6 md:pt-8">
        <div className="max-w-2xl w-full mx-auto">
          {/* Đây là nơi nội dung các trang Dashboard, Transactions... sẽ hiển thị */}
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
