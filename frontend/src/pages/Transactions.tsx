import React, { useState } from 'react';
import { Wallet, Utensils, Car, ShoppingBag, Zap, Droplets, CircleDollarSign } from 'lucide-react';
import type { Transaction as TransactionType } from '../types/dashboard';
import TransactionSummary from '../components/transactions/TransactionSummary';
import TransactionHistory from '../components/transactions/TransactionHistory';
import TransactionChart from '../components/transactions/TransactionChart';
import TransactionFilters from '../components/transactions/TransactionFilters';
import { useTransactions } from '../hooks/useTransactions';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Ăn uống': return <Utensils size={18} />;
    case 'Di chuyển': return <Car size={18} />;
    case 'Hóa đơn': return <Zap size={18} />;
    case 'Mua sắm': return <ShoppingBag size={18} />;
    case 'Thu nhập': return <Wallet size={18} />;
    default: return <CircleDollarSign size={18} />;
  }
};

interface TransactionsProps {
  onEditTransaction: (tx: TransactionType) => void;
}

export default function Transactions({ onEditTransaction }: TransactionsProps) {
  const { transactions, loading, income, expense } = useTransactions();

  if (loading) {
    return <div className="text-center text-white/50 p-10">Đang tải dữ liệu giao dịch...</div>;
  }

  const mappedTransactions: TransactionType[] = transactions.map(t => ({
    id: t._id,
    icon: getCategoryIcon(t.category),
    name: t.name,
    category: t.category,
    amount: t.amount,
    isIncome: t.isIncome,
    date: new Date(t.date).toLocaleDateString('vi-VN')
  }));

  return (
    <div className="space-y-6">
      <TransactionFilters />

      <TransactionChart />

      <TransactionSummary 
        income={income} 
        expense={expense} 
      />

      <TransactionHistory 
        transactions={mappedTransactions} 
        onEdit={onEditTransaction}
      />
    </div>
  );
}
