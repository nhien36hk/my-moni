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
  const currentDate = new Date();
  const currentMonthKey = currentDate.toISOString().slice(0, 7); // "2026-05"
  
  const startDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0);
  const startDate = startDateObj.toISOString();

  // Load ALL transactions to calculate carry-over
  const { transactions, loading: txLoading } = useTransactions();
  const { goals, loading: goalLoading } = useGoals();

  if (txLoading || goalLoading) {
    return <div className="text-center text-white/50 p-10">Đang tải dữ liệu...</div>;
  }

  // Lấy mục tiêu tháng hiện tại
  const currentGoal = goals.find(g => g.monthKey === currentMonthKey)?.targetAmount || 0;

  // 1. Phân loại giao dịch: Quá khứ vs Tháng này
  const pastTxs = transactions.filter(t => new Date(t.date) < startDateObj);
  const currentTxs = transactions.filter(t => new Date(t.date) >= startDateObj);

  // 2. Tính số dư quá khứ
  const pastIncome = pastTxs.filter(t => t.isIncome).reduce((sum, t) => sum + t.amount, 0);
  const pastExpense = pastTxs.filter(t => !t.isIncome).reduce((sum, t) => sum + t.amount, 0);
  const pastBalanceRaw = pastIncome - pastExpense;

  // 3. Trừ đi mục tiêu tiết kiệm của các tháng trước (Chỉ tính mục tiêu tháng)
  const pastGoals = goals.filter(g => g.monthKey < currentMonthKey && g.type !== 'yearly');
  const totalPastSaved = pastGoals.reduce((sum, g) => {
    // Nếu quá khứ đạt mục tiêu -> trừ target. Nếu không đạt -> trừ actualAmount.
    // Thực tế để đơn giản theo yêu cầu: "trừ đi mục tiêu tiết kiệm" -> dùng targetAmount.
    // Dùng actualAmount sẽ chính xác hơn nếu backend lưu actualAmount = số tiền thực gởi vào tiết kiệm.
    return sum + (g.actualAmount > 0 ? g.actualAmount : g.targetAmount);
  }, 0);

  const carryOver = pastBalanceRaw - totalPastSaved;

  // 4. Tính toán cho tháng hiện tại
  const currentMonthIncome = currentTxs.filter(t => t.isIncome).reduce((sum, t) => sum + t.amount, 0);
  const currentMonthExpense = currentTxs.filter(t => !t.isIncome).reduce((sum, t) => sum + t.amount, 0);

  // Tổng thu = Số dư mang sang + Thu nhập tháng này
  const displayIncome = currentMonthIncome + (carryOver > 0 ? carryOver : 0);
  const displayExpense = currentMonthExpense + (carryOver < 0 ? Math.abs(carryOver) : 0);
  const displayBalance = displayIncome - displayExpense;

  const status = getGoalStatus(displayBalance, currentGoal);
  const statusCfg = STATUS_CONFIG[status];

  // Giao dịch gần đây (chỉ lấy trong tháng này)
  const recentTxs = currentTxs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="space-y-5">
      <BalanceHero 
        balance={displayBalance} 
        income={displayIncome} 
        expense={displayExpense} 
      />

      <SavingGoal 
        balance={displayBalance} 
        goal={currentGoal} 
        statusCfg={statusCfg} 
      />

      <RecentTransactions 
        transactions={recentTxs} 
      />
    </div>
  );
}
