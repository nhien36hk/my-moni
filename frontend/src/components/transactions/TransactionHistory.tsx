import React from 'react';
import TransactionItem from './TransactionItem';
import type { TransactionData } from '../../hooks/useTransactions';
import { useModalStore } from '../../store/useModalStore';

interface TransactionHistoryProps {
  transactions: TransactionData[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <div className="glass-card p-0 overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <h3 className="font-bold text-white">Lịch sử giao dịch</h3>
      </div>
      <div className="divide-y divide-white/5">
        {transactions.map((tx) => (
          <TransactionItem 
            key={tx._id} 
            transaction={tx} 
          />
        ))}
      </div>
    </div>
  );
}
