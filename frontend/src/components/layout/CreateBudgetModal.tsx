import React, { useState } from 'react';
import { X, Plus, Palette, Layout } from 'lucide-react';
import { useBudgetStore } from '../../store/useBudgetStore';

interface CreateBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_COLORS = [
  '#f472b6', // Pink
  '#a78bfa', // Purple
  '#60a5fa', // Blue
  '#34d399', // Emerald
  '#fbbf24', // Amber
  '#f87171', // Red
];

export default function CreateBudgetModal({ isOpen, onClose }: CreateBudgetModalProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const createBudget = useBudgetStore(state => state.createBudget);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const result = await createBudget({ name: name.trim(), color });
    
    setIsSubmitting(false);
    
    if (result.success) {
      onClose();
      setName('');
    } else {
      setError(result.error || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#1a1625] border border-white/10 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
            style={{ backgroundColor: color }}
          >
            <Plus size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Tạo ví gia đình</h2>
            <p className="text-sm text-[var(--text-secondary)]">Quản lý chi tiêu chung cùng người thân</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
              Tên ngân quỹ
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Gia đình nhỏ, Quỹ ăn chơi..."
              className="w-full px-4 py-3 bg-[#130f1c] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[var(--accent-primary)] transition-all"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] mb-3">
              <Palette size={16} /> Chọn màu sắc đại diện
            </label>
            <div className="flex flex-wrap gap-3">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-xl border-2 transition-all ${
                    color === c ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-[var(--danger)]">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className="w-full py-3.5 mt-2 bg-white text-black rounded-xl font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              'Bắt đầu tạo ví'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
