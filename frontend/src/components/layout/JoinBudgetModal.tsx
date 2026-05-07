import React, { useState } from 'react';
import { X, Users, Key } from 'lucide-react';
import { useBudgetStore } from '../../store/useBudgetStore';

interface JoinBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinBudgetModal({ isOpen, onClose }: JoinBudgetModalProps) {
  const [budgetId, setBudgetId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const joinBudget = useBudgetStore(state => state.joinBudget);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budgetId.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const result = await joinBudget(budgetId.trim());
    
    setIsSubmitting(false);
    
    if (result.success) {
      onClose();
      setBudgetId('');
    } else {
      setError(result.error || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)]">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Tham gia ngân quỹ</h2>
            <p className="text-sm text-[var(--text-secondary)]">Nhập mã ID để gia nhập ví gia đình</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
              Mã ID Ngân Quỹ
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/30">
                <Key size={18} />
              </div>
              <input
                type="text"
                value={budgetId}
                onChange={(e) => setBudgetId(e.target.value)}
                placeholder="VD: 660a1b2c3d4e..."
                className="w-full pl-10 pr-4 py-3 bg-[#130f1c] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all"
                required
              />
            </div>
            {error && <p className="mt-2 text-xs text-[var(--danger)]">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !budgetId.trim()}
            className="w-full py-3.5 mt-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-xl font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              'Xác nhận tham gia'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
