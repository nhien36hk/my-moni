import React, { useState } from 'react';
import CurrentMonthGoal from '../components/goals/CurrentMonthGoal';
import GoalHistory from '../components/goals/GoalHistory';
import EditGoalModal from '../components/goals/EditGoalModal';

export default function Goals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetAmount, setTargetAmount] = useState(15000000);
  const month = "Tháng 05/2026";

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white px-2">Kế hoạch ngân quỹ</h2>
        <CurrentMonthGoal 
          month={month} 
          targetAmount={targetAmount} 
          currentAmount={7500000} 
          onEditClick={() => setIsModalOpen(true)}
        />
      </section>

      <GoalHistory />

      <div className="p-4 rounded-2xl bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/10">
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
          "Tiết kiệm không phải là số tiền còn lại sau khi chi tiêu, mà là số tiền chi tiêu sau khi đã tiết kiệm."
        </p>
      </div>

      {/* Modal được đặt ở đây để đảm bảo hiển thị đè lên toàn bộ app */}
      <EditGoalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialAmount={targetAmount}
        month={month}
        onSave={(newAmount) => setTargetAmount(newAmount)}
      />
    </div>
  );
}
