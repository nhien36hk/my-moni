import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface TransactionFiltersProps {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonth: number | null;
  setSelectedMonth: (month: number | null) => void;
}

export default function TransactionFilters({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth
}: TransactionFiltersProps) {
  const months = [
    { label: 'Tất cả', value: null },
    { label: 'T1', value: 1 },
    { label: 'T2', value: 2 },
    { label: 'T3', value: 3 },
    { label: 'T4', value: 4 },
    { label: 'T5', value: 5 },
    { label: 'T6', value: 6 },
    { label: 'T7', value: 7 },
    { label: 'T8', value: 8 },
    { label: 'T9', value: 9 },
    { label: 'T10', value: 10 },
    { label: 'T11', value: 11 },
    { label: 'T12', value: 12 }
  ];

  const years = [selectedYear - 2, selectedYear - 1, selectedYear, selectedYear + 1, selectedYear + 2];

  return (
    <div className="space-y-4">
      {/* Year Scroller */}
      <div className="flex items-center justify-between bg-white/5 p-2 rounded-2xl border border-white/5">
        <button
          onClick={() => setSelectedYear(selectedYear - 1)}
          className="p-2 hover:bg-white/5 rounded-xl text-white/60 hover:text-white transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        
        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all
                ${selectedYear === y
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-white/40 hover:text-white/60'}`}
            >
              Năm {y}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSelectedYear(selectedYear + 1)}
          className="p-2 hover:bg-white/5 rounded-xl text-white/60 hover:text-white transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Month Scroller */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
          <Calendar size={18} />
        </div>
        
        {months.map((m) => (
          <button
            key={m.label}
            onClick={() => setSelectedMonth(m.value)}
            className={`flex-shrink-0 px-5 py-2 rounded-xl text-xs font-bold transition-all border
              ${selectedMonth === m.value 
                ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white shadow-[0_5px_15px_rgba(244,114,182,0.3)]' 
                : 'bg-white/5 border-white/5 text-[var(--text-secondary)] hover:bg-white/10'}`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
