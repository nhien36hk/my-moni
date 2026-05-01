import React from 'react';
import { LogOut, ChevronRight } from 'lucide-react';
import ProfileSection from '../components/settings/ProfileSection';

export default function Settings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white px-2">Cài đặt hệ thống</h2>
      
      <ProfileSection />

      <button className="w-full glass-card p-4 flex items-center justify-between text-red-400 hover:bg-red-500/10 transition-all border-none">
        <div className="flex items-center gap-3">
          <LogOut size={18} />
          <span className="text-sm font-bold">Đăng xuất</span>
        </div>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
