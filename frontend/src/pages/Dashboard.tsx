import React from 'react';
import type { GoalStatus, StatusConfig } from '../types/dashboard';
import BalanceHero from '../components/dashboard/BalanceHero';
import SavingGoal from '../components/dashboard/SavingGoal';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { useTransactions } from '../hooks/useTransactions';
import type { TransactionData } from '../hooks/useTransactions';
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

export default function Dashboard() {
  const { transactions, loading: txLoading, income, expense, balance } = useTransactions();
  const { goals, loading: goalLoading } = useGoals();

  if (txLoading || goalLoading) {
    return <div className="text-center text-white/50 p-10">Đang tải dữ liệu...</div>;
  }

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
        transactions={transactions.slice(0, 5)} 
      />
    </div>
  );
}
