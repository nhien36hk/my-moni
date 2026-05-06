import React from 'react';
import { CheckCircle2, XCircle, ChevronRight, Target } from 'lucide-react';
import { formatMoney } from '../../utils/format';
import type { GoalData } from '../../hooks/useGoals';

interface GoalHistoryProps {
  goals: GoalData[];
}

export default function GoalHistory({ goals }: GoalHistoryProps) {
  const currentMonthKey = new Date().toISOString().slice(0, 7); // "2026-05"

  // Lọc bỏ tháng hiện tại và sắp xếp theo thời gian mới nhất lên đầu
  const sortedGoals = [...goals]
    .filter(g => g.monthKey !== currentMonthKey)
    .sort((a, b) => b.monthKey.localeCompare(a.monthKey));

  if (sortedGoals.length === 0) {
    return (
      <div className="p-8 text-center glass-card border-dashed">
        <Target size={32} className="mx-auto mb-3 text-white/10" />
        <p className="text-sm text-white/30 italic">Chưa có lịch sử mục tiêu</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-white px-2">Lịch sử mục tiêu</h4>
      <div className="space-y-3">
        {sortedGoals.map((item) => {
          const isSuccess = item.actualAmount >= item.targetAmount || item.status === 'success';
          const percent = item.targetAmount > 0 
            ? Math.min((item.actualAmount / item.targetAmount) * 100, 100) 
            : 0;
          
          const [year, month] = item.monthKey.split('-');
          const monthDisplay = `Tháng ${month}/${year}`;
          
          return (
            <div key={item._id} className="glass-card p-4 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${isSuccess ? 'bg-[var(--success)]/10 text-[var(--success)]' : 'bg-[var(--danger)]/10 text-[var(--danger)]'}`}>
                  {isSuccess ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">{monthDisplay}</h5>
                  <p className="text-[10px] text-[var(--text-secondary)]">
                    Đạt được: {formatMoney(item.actualAmount)} / {formatMoney(item.targetAmount)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className={`text-xs font-black ${isSuccess ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
                    {percent.toFixed(0)}%
                  </span>
                </div>
                <ChevronRight size={14} className="text-white/20 group-hover:text-white/40 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
