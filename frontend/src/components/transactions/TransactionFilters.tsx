import React from 'react';
import { Calendar } from 'lucide-react';

export default function TransactionFilters() {
  const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
  const activeMonth = 'T5';

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <button className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all">
        <Calendar size={18} />
      </button>
      
      {months.map((m) => (
        <button
          key={m}
          className={`flex-shrink-0 px-5 py-2 rounded-xl text-xs font-bold transition-all border
            ${activeMonth === m 
              ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white shadow-[0_5px_15px_rgba(244,114,182,0.3)]' 
              : 'bg-white/5 border-white/5 text-[var(--text-secondary)] hover:bg-white/10'}`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
