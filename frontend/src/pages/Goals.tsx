import React, { useState } from 'react';
import CurrentMonthGoal from '../components/goals/CurrentMonthGoal';
import GoalHistory from '../components/goals/GoalHistory';
import EditGoalModal from '../components/goals/EditGoalModal';
import { useGoals } from '../hooks/useGoals';
import { useTransactions } from '../hooks/useTransactions';
import { Plus, Target, TrendingUp } from 'lucide-react';

import EmptyGoalPlaceholder from '../components/goals/EmptyGoalPlaceholder';

export default function Goals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { goals, loading: goalLoading, upsertGoal } = useGoals();
  const { balance, loading: txLoading } = useTransactions();

  if (goalLoading || txLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
        <div className="w-8 h-8 border-4 border-[var(--accent-primary)]/20 border-t-[var(--accent-primary)] rounded-full animate-spin"></div>
        <div className="text-center text-white/50 animate-pulse">Đang tải dữ liệu mục tiêu...</div>
      </div>
    );
  }

  const currentMonthKey = new Date().toISOString().slice(0, 7); // "2026-05"
  const monthDisplay = `Tháng ${currentMonthKey.split('-')[1]}/${currentMonthKey.split('-')[0]}`;
  
  // Lấy mục tiêu của tháng hiện tại
  const currentGoal = goals.find(g => g.monthKey === currentMonthKey && g.type !== 'yearly')?.targetAmount || 0;

  const handleSaveGoal = async (newAmount: number) => {
    await upsertGoal(currentMonthKey, newAmount);
  };

  return (
    <div className="space-y-8 pb-20">
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="text-[var(--accent-primary)]" size={22} />
            Ngân quỹ tháng này
          </h2>
        </div>

        {currentGoal > 0 ? (
          <CurrentMonthGoal 
            month={monthDisplay} 
            targetAmount={currentGoal} 
            currentAmount={balance} 
            onEditClick={() => setIsModalOpen(true)}
          />
        ) : (
          <EmptyGoalPlaceholder 
            month={monthDisplay} 
            onClick={() => setIsModalOpen(true)} 
          />
        )}
      </section>

      {/* Lịch sử mục tiêu */}
      <GoalHistory goals={goals} />

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
