import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

interface LayoutProps {
  onAddClick: () => void;
}

export default function Layout({ onAddClick }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header onAddClick={onAddClick} />

      {/* Page Content */}
      <main className="flex-1 w-full px-4 pb-24 pt-4 md:pb-12 md:px-6 md:pt-8">
        <div className="max-w-2xl w-full mx-auto">
          {/* Đây là nơi nội dung các trang Dashboard, Transactions... sẽ hiển thị */}
          <Outlet />
        </div>
      </main>

      <BottomNav onAddClick={onAddClick} />
    </div>
  );
}
