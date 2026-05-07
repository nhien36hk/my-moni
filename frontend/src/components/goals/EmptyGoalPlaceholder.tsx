import React from 'react';
import { Plus, Target, Sparkles } from 'lucide-react';

interface EmptyGoalPlaceholderProps {
  month: string;
  onClick: () => void;
}

export default function EmptyGoalPlaceholder({ month, onClick }: EmptyGoalPlaceholderProps) {
  return (
    <div 
      onClick={onClick}
      className="relative overflow-hidden group cursor-pointer"
    >
      {/* Hiệu ứng ánh sáng nền (Glow effect) */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--accent-primary)]/10 rounded-full blur-[80px] group-hover:bg-[var(--accent-primary)]/20 transition-all duration-700"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]"></div>

      <div className="glass-card p-10 border-dashed border-white/10 flex flex-col items-center text-center space-y-6 hover:border-[var(--accent-primary)]/40 transition-all duration-300">
        
        {/* Icon Container với hiệu ứng Stack */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-[24px] flex items-center justify-center shadow-[0_10px_40px_rgba(244,114,182,0.3)] group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
            <Target size={38} className="text-white" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#1a1625] rounded-full p-1 border-2 border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 delay-75">
            <Plus size={16} className="text-[var(--accent-primary)]" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-black text-white flex items-center justify-center gap-2">
            <Sparkles size={18} className="text-yellow-400 animate-pulse" />
            Lên kế hoạch cho {month}
          </h3>
          <p className="text-sm text-white/40 max-w-[280px] leading-relaxed">
            Bạn chưa thiết lập ngân quỹ tiết kiệm. Hãy bắt đầu ngay để quản lý chi tiêu thông minh hơn!
          </p>
        </div>

        <div className="pt-2">
          <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-white 
                           group-hover:bg-gradient-to-r group-hover:from-[var(--accent-primary)] group-hover:to-[var(--accent-secondary)] 
                           group-hover:border-transparent group-hover:shadow-[0_10px_20px_rgba(244,114,182,0.2)] 
                           transition-all duration-300 active:scale-95">
            Thiết lập mục tiêu ngay
          </button>
        </div>
      </div>
    </div>
  );
}
