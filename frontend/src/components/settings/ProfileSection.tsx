import React from 'react';
import { User, Shield, Bell, Pencil } from 'lucide-react';

interface ProfileSectionProps {
  user: { name: string; email: string };
  onEditClick: () => void;
}

export default function ProfileSection({ user, onEditClick }: ProfileSectionProps) {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="glass-card p-8 flex flex-col items-center text-center space-y-5 relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--accent-primary)] opacity-5 blur-3xl"></div>
        
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] p-1 shadow-[0_0_20px_rgba(244,114,182,0.3)]">
            <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center overflow-hidden">
              <User size={40} className="text-[var(--accent-primary)]" />
            </div>
          </div>
          <button 
            onClick={onEditClick}
            className="absolute bottom-0 right-0 p-2 bg-[var(--bg-secondary)] border border-white/10 rounded-full text-white shadow-lg hover:bg-white/10 transition-all cursor-pointer"
          >
            <Pencil size={14} />
          </button>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-1">{user.name}</h3>
          <p className="text-xs text-[var(--text-secondary)]">{user.email}</p>
        </div>

        <button 
          onClick={onEditClick}
          className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          Chỉnh sửa hồ sơ
        </button>
      </div>

      {/* Menu Options */}
      <div className="glass-card p-2">
        <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl cursor-pointer transition-all group">
          <div className="flex items-center gap-3">
            <Shield size={18} className="text-[var(--accent-primary)]" />
            <span className="text-sm font-medium text-white">Bảo mật tài khoản</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl cursor-pointer transition-all group">
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-[var(--accent-primary)]" />
            <span className="text-sm font-medium text-white">Thông báo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
