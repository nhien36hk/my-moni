import React, { useState } from 'react';
import { Edit2, Check, Target } from 'lucide-react';
import { formatMoney } from '../../utils/format';

interface CurrentMonthGoalProps {
  currentAmount: number;
  targetAmount: number;
  month: string;
}

export default function CurrentMonthGoal({ currentAmount, targetAmount, month }: CurrentMonthGoalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTarget, setTempTarget] = useState(targetAmount.toString());
  const [displayTarget, setDisplayTarget] = useState(targetAmount);

  const percent = Math.min((currentAmount / displayTarget) * 100, 100);

  const handleSave = () => {
    setDisplayTarget(Number(tempTarget));
    setIsEditing(false);
  };

  return (
    <div className="glass-card p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-[var(--accent-primary)] opacity-5 rounded-full blur-2xl"></div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-white shadow-[0_0_20px_rgba(244,114,182,0.3)]">
            <Target size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Mục tiêu {month}</h3>
            <p className="text-xs text-[var(--text-secondary)]">Tiến độ tiết kiệm tháng này</p>
          </div>
        </div>

        {isEditing ? (
          <button onClick={handleSave} className="p-2 bg-[var(--success)]/20 text-[var(--success)] rounded-xl hover:bg-[var(--success)]/30 transition-all">
            <Check size={18} />
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="p-2 bg-white/5 text-white/60 rounded-xl hover:bg-white/10 transition-all">
            <Edit2 size={18} />
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div className="text-center">
          {isEditing ? (
            <div className="relative inline-block">
              <input 
                type="number"
                value={tempTarget}
                onChange={(e) => setTempTarget(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-2xl font-black text-white outline-none focus:border-[var(--accent-primary)] text-center w-48"
                autoFocus
              />
              <span className="block text-[10px] text-[var(--text-secondary)] mt-2 italic">Nhập mục tiêu mới (VND)</span>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-4xl font-black text-white tabular-nums tracking-tighter">
                {formatMoney(displayTarget)}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">Số tiền cần tiết kiệm</p>
            </div>
          )}
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
