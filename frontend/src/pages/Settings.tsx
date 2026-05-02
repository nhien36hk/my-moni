import React, { useState } from 'react';
import { LogOut, ChevronRight } from 'lucide-react';
import ProfileSection from '../components/settings/ProfileSection';
import EditProfileModal from '../components/settings/EditProfileModal';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const profileData = {
    name: user?.name ?? 'Chưa đăng nhập',
    email: user?.email ?? ''
  };

  const handleSaveProfile = (newData: { name: string; email: string }) => {
    // TODO: Gọi API cập nhật profile khi cần
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white px-2">Cài đặt hệ thống</h2>
      
      <ProfileSection 
        user={profileData} 
        onEditClick={() => setIsEditModalOpen(true)} 
      />

      <button 
        onClick={logout}
        className="w-full glass-card p-4 flex items-center justify-between text-red-400 hover:bg-red-500/10 transition-all border-none"
      >
        <div className="flex items-center gap-3">
          <LogOut size={18} />
          <span className="text-sm font-bold">Đăng xuất</span>
        </div>
        <ChevronRight size={16} />
      </button>

      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={profileData}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
