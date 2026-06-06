import React, { useState } from 'react';
import TransactionItem from './TransactionItem';
import type { TransactionData } from '../../hooks/useTransactions';
import { useModalStore } from '../../store/useModalStore';
import { ChevronDown, ChevronRight, Calendar } from 'lucide-react';
import { formatMoney } from '../../utils/format';

interface TransactionHistoryProps {
  transactions: TransactionData[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({});

  // Group transactions by date string
  const groupedTransactions = React.useMemo(() => {
    const groups: Record<string, TransactionData[]> = {};
    transactions.forEach((tx) => {
      const dateKey = new Date(tx.date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(tx);
    });
    return groups;
  }, [transactions]);

  const toggleDate = (dateKey: string) => {
    setExpandedDates(prev => ({
      ...prev,
      [dateKey]: !prev[dateKey]
    }));
  };

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => {
    const parseDate = (dStr: string) => {
      const [day, month, year] = dStr.split('/').map(Number);
      return new Date(year, month - 1, day).getTime();
    };
    return parseDate(b) - parseDate(a); // Mới nhất lên đầu
  });

  return (
    <div className="glass-card p-0 overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <h3 className="font-bold text-white">Lịch sử giao dịch</h3>
      </div>
      
      {sortedDates.length === 0 ? (
        <div className="p-8 text-center text-white/40 text-xs">
          Chưa có giao dịch nào trong khoảng thời gian này
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          {sortedDates.map((dateKey) => {
            const txs = groupedTransactions[dateKey];
            const isExpanded = !!expandedDates[dateKey];
            
            const dayIncome = txs.filter(t => t.isIncome).reduce((sum, t) => sum + t.amount, 0);
            const dayExpense = txs.filter(t => !t.isIncome).reduce((sum, t) => sum + t.amount, 0);

            return (
              <div key={dateKey} className="flex flex-col">
                {/* Header Ngày */}
                <button
                  onClick={() => toggleDate(dateKey)}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg text-white/50">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{dateKey}</p>
                      <p className="text-[10px] text-white/40">{txs.length} giao dịch</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      {dayIncome > 0 && (
                        <p className="text-[10px] font-bold text-[var(--success)]">+{formatMoney(dayIncome)}</p>
                      )}
                      {dayExpense > 0 && (
                        <p className="text-[10px] font-bold text-[var(--danger)]">-{formatMoney(dayExpense)}</p>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronDown size={16} className="text-white/40" />
                    ) : (
                      <ChevronRight size={16} className="text-white/40" />
                    )}
                  </div>
                </button>

                {/* Danh sách giao dịch của ngày */}
                {isExpanded && (
                  <div className="pl-4 pr-2 pb-2 bg-black/10 divide-y divide-white/5 animate-in fade-in slide-in-from-top-1 duration-150">
                    {txs.map((tx) => (
                      <TransactionItem 
                        key={tx._id} 
                        transaction={tx} 
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
