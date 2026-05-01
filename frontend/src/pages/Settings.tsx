import React, { useState } from 'react';
import { LogOut, ChevronRight } from 'lucide-react';
import ProfileSection from '../components/settings/ProfileSection';
import EditProfileModal from '../components/settings/EditProfileModal';

export default function Settings() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [user, setUser] = useState({
    name: "Nguyễn Thành Nhân",
    email: "nhan.backend@example.com"
  });

  const handleSaveProfile = (newData: { name: string; email: string }) => {
    setUser(newData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white px-2">Cài đặt hệ thống</h2>
      
      <ProfileSection 
        user={user} 
        onEditClick={() => setIsEditModalOpen(true)} 
      />

      <button className="w-full glass-card p-4 flex items-center justify-between text-red-400 hover:bg-red-500/10 transition-all border-none">
        <div className="flex items-center gap-3">
          <LogOut size={18} />
          <span className="text-sm font-bold">Đăng xuất</span>
        </div>
        <ChevronRight size={16} />
      </button>

      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={user}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
