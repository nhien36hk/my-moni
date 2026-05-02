import React from 'react';
import type { Transaction } from '../../types/dashboard';
import { formatMoney } from '../../utils/format';
import { Pencil } from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onEdit?: (transaction: Transaction) => void;
}

export default function TransactionHistory({ transactions, onEdit }: TransactionHistoryProps) {
  return (
    <div className="glass-card p-0 overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <h3 className="font-bold text-white">Lịch sử giao dịch</h3>
      </div>
      <div className="divide-y divide-white/5">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ 
                background: tx.isIncome ? 'rgba(16, 185, 129, 0.12)' : 'rgba(251, 207, 232, 0.15)',
                color: tx.isIncome ? 'var(--success)' : 'var(--accent-primary)'
              }}
            >
              {tx.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white truncate">{tx.name}</h4>
              <p className="text-xs text-[var(--text-secondary)]">{tx.category} • {tx.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`text-sm font-bold tabular-nums ${tx.isIncome ? 'text-[var(--success)]' : 'text-white'}`}>
                {tx.isIncome ? '+' : '-'}{formatMoney(tx.amount)}
              </div>
              {onEdit && (
                <button 
                  onClick={() => onEdit(tx)}
                  className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                >
                  <Pencil size={12} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
