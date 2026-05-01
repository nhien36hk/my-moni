import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { formatMoney } from '../../utils/format';

interface TransactionSummaryProps {
  income: number;
  expense: number;
}

export default function TransactionSummary({ income, expense }: TransactionSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="glass-card p-5 border-l-4 border-[var(--success)] shadow-[0_0_20px_rgba(16,185,129,0.1)]">
        <div className="flex items-center gap-3 mb-2">
          <ArrowUpCircle className="text-[var(--success)]" size={20} />
          <span className="text-xs font-medium text-[var(--text-secondary)]">Tổng thu</span>
        </div>
        <p className="text-xl font-bold text-white tabular-nums">{formatMoney(income)}</p>
      </div>

      <div className="glass-card p-5 border-l-4 border-[var(--danger)] shadow-[0_0_20px_rgba(239,68,68,0.1)]">
        <div className="flex items-center gap-3 mb-2">
          <ArrowDownCircle className="text-[var(--danger)]" size={20} />
          <span className="text-xs font-medium text-[var(--text-secondary)]">Tổng chi</span>
        </div>
        <p className="text-xl font-bold text-white tabular-nums">{formatMoney(expense)}</p>
      </div>
    </div>
  );
}
