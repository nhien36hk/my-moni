import React, { useState } from 'react';
import TransactionSummary from '../components/transactions/TransactionSummary';
import TransactionHistory from '../components/transactions/TransactionHistory';
import TransactionChart from '../components/transactions/TransactionChart';
import TransactionFilters from '../components/transactions/TransactionFilters';
import { useTransactions } from '../hooks/useTransactions';
import type { TransactionData } from '../hooks/useTransactions';

export default function Transactions() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(new Date().getMonth() + 1);

  // Tính toán thời gian bắt đầu và kết thúc
  const startDate = selectedMonth !== null
    ? new Date(selectedYear, selectedMonth - 1, 1, 0, 0, 0, 0).toISOString()
    : new Date(selectedYear, 0, 1, 0, 0, 0, 0).toISOString();

  const endDate = selectedMonth !== null
    ? new Date(selectedYear, selectedMonth, 0, 23, 59, 59, 999).toISOString()
    : new Date(selectedYear, 12, 0, 23, 59, 59, 999).toISOString();

  const { transactions, loading, income, expense } = useTransactions(startDate, endDate);

  if (loading) {
    return <div className="text-center text-white/50 p-10">Đang tải dữ liệu giao dịch...</div>;
  }

  return (
    <div className="space-y-6">
      <TransactionFilters 
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

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
