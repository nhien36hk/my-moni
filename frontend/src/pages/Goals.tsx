import React, { useState } from 'react';
import CurrentMonthGoal from '../components/goals/CurrentMonthGoal';
import GoalHistory from '../components/goals/GoalHistory';
import EditGoalModal from '../components/goals/EditGoalModal';
import { useGoals } from '../hooks/useGoals';
import { useTransactions } from '../hooks/useTransactions';

export default function Goals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { goals, loading: goalLoading, upsertGoal } = useGoals();
  const { balance, loading: txLoading } = useTransactions();

  if (goalLoading || txLoading) {
    return <div className="text-center text-white/50 p-10">Đang tải dữ liệu mục tiêu...</div>;
  }

  const currentMonthKey = new Date().toISOString().slice(0, 7); // "2026-05"
  const monthDisplay = `Tháng ${currentMonthKey.split('-')[1]}/${currentMonthKey.split('-')[0]}`;
  
  // Lấy mục tiêu của tháng hiện tại, nếu chưa có thì mặc định là 0
  const currentGoal = goals.find(g => g.monthKey === currentMonthKey)?.targetAmount || 0;

  const handleSaveGoal = async (newAmount: number) => {
    await upsertGoal(currentMonthKey, newAmount);
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white px-2">Kế hoạch ngân quỹ</h2>
        <CurrentMonthGoal 
          month={monthDisplay} 
          targetAmount={currentGoal} 
          currentAmount={balance} // Lấy số dư hiện tại từ API Transactions
          onEditClick={() => setIsModalOpen(true)}
        />
      </section>

      {/* Lịch sử mục tiêu có thể truyền dữ liệu goals vào sau */}
      <GoalHistory />

      <div className="p-4 rounded-2xl bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/10">
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
          "Tiết kiệm không phải là số tiền còn lại sau khi chi tiêu, mà là số tiền chi tiêu sau khi đã tiết kiệm."
        </p>
      </div>

      <EditGoalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialAmount={currentGoal}
        month={monthDisplay}
        onSave={handleSaveGoal}
      />
    </div>
  );
}
