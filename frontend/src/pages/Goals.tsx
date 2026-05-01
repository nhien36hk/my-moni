import React from 'react';
import CurrentMonthGoal from '../components/goals/CurrentMonthGoal';
import GoalHistory from '../components/goals/GoalHistory';

export default function Goals() {
  return (
    <div className="space-y-8">
      {/* 1. Mục tiêu duy nhất của tháng này */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white px-2">Kế hoạch ngân quỹ</h2>
        <CurrentMonthGoal 
          month="Tháng 05/2026" 
          targetAmount={15000000} 
          currentAmount={7500000} 
        />
      </section>

      {/* 2. Lịch sử các tháng trước */}
      <GoalHistory />

      {/* Tip Section */}
      <div className="p-4 rounded-2xl bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/10">
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
          "Tiết kiệm không phải là số tiền còn lại sau khi chi tiêu, mà là số tiền chi tiêu sau khi đã tiết kiệm."
        </p>
      </div>
    </div>
  );
}
