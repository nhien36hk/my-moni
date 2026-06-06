import React, { useState } from 'react';
import { LogOut, ChevronRight } from 'lucide-react';
import ProfileSection from '../components/settings/ProfileSection';
import EditProfileModal from '../components/settings/EditProfileModal';
import { useAuth } from '../context/AuthContext';
import { useBudgetStore } from '../store/useBudgetStore';
import CreateBudgetModal from '../components/layout/CreateBudgetModal';
import JoinBudgetModal from '../components/layout/JoinBudgetModal';

export default function Settings() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [defaultMode, setDefaultMode] = useState<'personal' | 'family'>(
    (localStorage.getItem('default_mode') as 'personal' | 'family') || 'personal'
  );
  
  const { user, logout } = useAuth();
  const { budgets, setActiveBudget } = useBudgetStore();

  const profileData = {
    name: user?.name ?? 'Chưa đăng nhập',
    email: user?.email ?? ''
  };

  const handleSaveProfile = (newData: { name: string; email: string }) => {
    // TODO: Gọi API cập nhật profile khi cần
  };

  const handleModeChange = (mode: 'personal' | 'family') => {
    setDefaultMode(mode);
    localStorage.setItem('default_mode', mode);
    
    // Tự động chuyển sang ví đầu tiên của chế độ đó nếu tồn tại
    const matchingBudget = budgets.find(b => b.type === mode);
    if (matchingBudget) {
      setActiveBudget(matchingBudget._id);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white px-2">Cài đặt hệ thống</h2>
      
      <ProfileSection 
        user={profileData} 
        onEditClick={() => setIsEditModalOpen(true)} 
      />

      {/* Cài đặt chế độ hoạt động */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-white mb-2">Chế độ hoạt động mặc định</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleModeChange('personal')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              defaultMode === 'personal'
                ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)] text-white shadow-[0_5px_20px_rgba(244,114,182,0.15)]'
                : 'bg-white/5 border-transparent text-white/60 hover:bg-white/10'
            }`}
          >
            <div className="font-bold text-sm mb-1">Cá nhân</div>
            <div className="text-[10px] opacity-60">Quản lý chi tiêu riêng tư của bản thân</div>
          </button>

          <button
            onClick={() => handleModeChange('family')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              defaultMode === 'family'
                ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)] text-white shadow-[0_5px_20px_rgba(244,114,182,0.15)]'
                : 'bg-white/5 border-transparent text-white/60 hover:bg-white/10'
            }`}
          >
            <div className="font-bold text-sm mb-1">Gia đình</div>
            <div className="text-[10px] opacity-60">Quản lý chi tiêu chung cùng các thành viên</div>
          </button>
        </div>

        {defaultMode === 'family' && (
          <div className="mt-4 p-4 rounded-2xl bg-white/5 space-y-3 border border-white/5">
            <p className="text-xs text-white/60 leading-relaxed">
              Chế độ gia đình cho phép chia sẻ tài chính. Khi nhập giao dịch, tên của bạn sẽ được hiển thị để phân biệt với các thành viên khác.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-xs transition-all border border-white/5"
              >
                Tạo ví gia đình mới
              </button>
              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="flex-1 py-2.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-bold rounded-xl text-xs transition-all shadow-[0_5px_15px_rgba(244,114,182,0.2)]"
              >
                Tham gia ví bằng ID
              </button>
            </div>
          </div>
        )}
      </div>

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

      <CreateBudgetModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <JoinBudgetModal 
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}
