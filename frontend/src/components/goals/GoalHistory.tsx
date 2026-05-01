import React from 'react';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { formatMoney } from '../../utils/format';

interface HistoryItem {
  id: string;
  month: string;
  target: number;
  achieved: number;
}

const MOCK_HISTORY: HistoryItem[] = [
  { id: '1', month: 'Tháng 04/2026', target: 12000000, achieved: 12500000 },
  { id: '2', month: 'Tháng 03/2026', target: 10000000, achieved: 8500000 },
  { id: '3', month: 'Tháng 02/2026', target: 10000000, achieved: 10000000 },
];

export default function GoalHistory() {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-white px-2">Lịch sử mục tiêu</h4>
      <div className="space-y-3">
        {MOCK_HISTORY.map((item) => {
          const isSuccess = item.achieved >= item.target;
          const percent = Math.min((item.achieved / item.target) * 100, 100);
          
          return (
            <div key={item.id} className="glass-card p-4 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${isSuccess ? 'bg-[var(--success)]/10 text-[var(--success)]' : 'bg-[var(--danger)]/10 text-[var(--danger)]'}`}>
                  {isSuccess ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">{item.month}</h5>
                  <p className="text-[10px] text-[var(--text-secondary)]">
                    Đạt được: {formatMoney(item.achieved)} / {formatMoney(item.target)}
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
