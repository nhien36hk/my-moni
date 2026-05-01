import React from 'react';
import { User, Camera, Shield, Bell } from 'lucide-react';

export default function ProfileSection() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="glass-card p-6 flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] p-1 shadow-[0_0_20px_rgba(244,114,182,0.3)]">
            <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center overflow-hidden">
              <User size={40} className="text-[var(--accent-primary)]" />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-[var(--bg-secondary)] border border-white/10 rounded-full text-white shadow-lg">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Nguyễn Thành Nhân</h3>
          <p className="text-xs text-[var(--text-secondary)]">nhan.backend@example.com</p>
        </div>
      </div>

      {/* Menu Options */}
      <div className="glass-card p-2">
        <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl cursor-pointer transition-all">
          <div className="flex items-center gap-3">
            <Shield size={18} className="text-[var(--accent-primary)]" />
            <span className="text-sm font-medium text-white">Bảo mật tài khoản</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl cursor-pointer transition-all">
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-[var(--accent-primary)]" />
            <span className="text-sm font-medium text-white">Thông báo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
