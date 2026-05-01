import React from 'react';
import { Wallet, Utensils, Car, ShoppingBag } from 'lucide-react';
import type { Transaction } from '../types/dashboard';
import TransactionSummary from '../components/transactions/TransactionSummary';
import TransactionHistory from '../components/transactions/TransactionHistory';
import TransactionChart from '../components/transactions/TransactionChart';
import TransactionFilters from '../components/transactions/TransactionFilters';

/* Mock data */
const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', icon: <Wallet size={18} />, name: 'Lương tháng 5', category: 'Thu nhập', amount: 15000000, isIncome: true, date: '01/05' },
  { id: '2', icon: <Utensils size={18} />, name: 'Ăn trưa Buffet', category: 'Ăn uống', amount: 350000, isIncome: false, date: '01/05' },
  { id: '3', icon: <Car size={18} />, name: 'Bảo dưỡng xe', category: 'Di chuyển', amount: 1200000, isIncome: false, date: '30/04' },
  { id: '4', icon: <ShoppingBag size={18} />, name: 'Mua iPhone 15', category: 'Mua sắm', amount: 25000000, isIncome: false, date: '28/04' },
];

export default function Transactions() {
  return (
    <div className="space-y-6">
      {/* 1. Bộ lọc thời gian */}
      <TransactionFilters />

      {/* 2. Biểu đồ cột xu hướng */}
      <TransactionChart />

      {/* 3. Tổng quan thu chi */}
      <TransactionSummary 
        income={15000000} 
        expense={26550000} 
      />

      {/* 4. Lịch sử chi tiết */}
      <TransactionHistory 
        transactions={MOCK_TRANSACTIONS} 
      />
    </div>
  );
}
