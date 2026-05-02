import React from 'react';
import { Wallet, Utensils, Car, ShoppingBag, Zap, Droplets, CircleDollarSign } from 'lucide-react';
import type { GoalStatus, StatusConfig, Transaction as TransactionType } from '../types/dashboard';
import BalanceHero from '../components/dashboard/BalanceHero';
import SavingGoal from '../components/dashboard/SavingGoal';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { useTransactions } from '../hooks/useTransactions';
import { useGoals } from '../hooks/useGoals';

const STATUS_CONFIG: Record<GoalStatus, StatusConfig> = {
  safe: { label: 'An toàn', color: 'var(--success)', bg: 'rgba(16, 185, 129, 0.15)' },
  warning: { label: 'Cẩn thận', color: 'var(--warning)', bg: 'rgba(245, 158, 11, 0.15)' },
  danger: { label: 'Nguy hiểm', color: 'var(--danger)', bg: 'rgba(239, 68, 68, 0.15)' },
};

function getGoalStatus(balance: number, goal: number): GoalStatus {
  if (balance >= goal) return 'safe';
  if (balance >= goal * 0.5) return 'warning';
  return 'danger';
}

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

interface DashboardProps {
  onEditTransaction: (tx: TransactionType) => void;
}

export default function Dashboard({ onEditTransaction }: DashboardProps) {
  const { transactions, loading: txLoading, income, expense, balance } = useTransactions();
  const { goals, loading: goalLoading } = useGoals();

  if (txLoading || goalLoading) {
    return <div className="text-center text-white/50 p-10">Đang tải dữ liệu...</div>;
  }

  // Chuyển đổi dữ liệu API sang format UI cần
  const mappedTransactions: TransactionType[] = transactions.slice(0, 5).map(t => ({
    id: t._id,
    icon: getCategoryIcon(t.category),
    name: t.name,
    category: t.category,
    amount: t.amount,
    isIncome: t.isIncome,
    date: new Date(t.date).toLocaleDateString('vi-VN')
  }));

  // Lấy mục tiêu tháng hiện tại
  const currentMonthKey = new Date().toISOString().slice(0, 7); // "2026-05"
  const currentGoal = goals.find(g => g.monthKey === currentMonthKey)?.targetAmount || 0;

  const status = getGoalStatus(balance, currentGoal);
  const statusCfg = STATUS_CONFIG[status];

  return (
    <div className="space-y-5">
      <BalanceHero 
        balance={balance} 
        income={income} 
        expense={expense} 
      />

      <SavingGoal 
        balance={balance} 
        goal={currentGoal} 
        statusCfg={statusCfg} 
      />

      <RecentTransactions 
        transactions={mappedTransactions} 
        onEdit={onEditTransaction}
      />
    </div>
  );
}
