import React from 'react';
import TransactionSummary from '../components/transactions/TransactionSummary';
import TransactionHistory from '../components/transactions/TransactionHistory';
import TransactionChart from '../components/transactions/TransactionChart';
import TransactionFilters from '../components/transactions/TransactionFilters';
import { useTransactions } from '../hooks/useTransactions';
import type { TransactionData } from '../hooks/useTransactions';

export default function Transactions() {
  const { transactions, loading, income, expense } = useTransactions();

  if (loading) {
    return <div className="text-center text-white/50 p-10">Đang tải dữ liệu giao dịch...</div>;
  }

  return (
    <div className="space-y-6">
      <TransactionFilters />

      <TransactionChart />

      <TransactionSummary 
        income={income} 
        expense={expense} 
      />

      <TransactionHistory 
        transactions={transactions} 
      />
    </div>
  );
}
