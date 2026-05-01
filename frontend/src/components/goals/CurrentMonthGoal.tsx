import React from 'react';
import { Edit2, Target } from 'lucide-react';
import { formatMoney } from '../../utils/format';

interface CurrentMonthGoalProps {
  currentAmount: number;
  targetAmount: number;
  month: string;
  onEditClick: () => void;
}

export default function CurrentMonthGoal({ currentAmount, targetAmount, month, onEditClick }: CurrentMonthGoalProps) {
  const percent = Math.min((currentAmount / targetAmount) * 100, 100);

  return (
    <div className="glass-card p-6 relative">
      {/* Background Decor - Thêm z-0 và pointer-events-none để không chặn click */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-[var(--accent-primary)] opacity-10 rounded-full blur-3xl pointer-events-none z-0"></div>
      
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-white shadow-[0_0_20px_rgba(244,114,182,0.3)]">
            <Target size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Mục tiêu {month}</h3>
            <p className="text-xs text-[var(--text-secondary)]">Tiến độ tiết kiệm tháng này</p>
          </div>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onEditClick();
          }}
          className="p-3 bg-white/10 text-white hover:bg-white/20 rounded-xl transition-all cursor-pointer shadow-lg active:scale-90"
          style={{ zIndex: 20 }}
          title="Chỉnh sửa mục tiêu"
        >
          <Edit2 size={20} />
        </button>
      </div>

      <div className="space-y-6">
        <div className="text-center space-y-1">
          <p className="text-4xl font-black text-white tabular-nums tracking-tighter">
            {formatMoney(targetAmount)}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">Số tiền cần tiết kiệm</p>
        </div>

        {/* Progress Section */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[10px] text-[var(--text-secondary)] uppercase font-bold">Đã tích lũy</p>
              <p className="text-sm font-bold text-[var(--success)]">{formatMoney(currentAmount)}</p>
            </div>
            <span className="text-2xl font-black text-white">{percent.toFixed(0)}%</span>
          </div>
          
          <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${percent}%`, 
                background: 'var(--gradient-primary)',
                boxShadow: '0 0 15px rgba(244,114,182,0.4)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
