import React from 'react';
import type { Goal } from '../../types/dashboard';
import { formatMoney } from '../../utils/format';

interface GoalCardProps {
  goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const percent = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${goal.color}20`, color: goal.color }}
          >
            {goal.icon}
          </div>
          <div>
            <h4 className="font-bold text-white">{goal.title}</h4>
            <p className="text-[10px] text-[var(--text-secondary)]">Hạn: {goal.deadline}</p>
          </div>
        </div>
        <span className="text-sm font-bold text-white">{percent.toFixed(0)}%</span>
      </div>

      <div className="space-y-2">
        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-1000"
            style={{ 
              width: `${percent}%`, 
              background: goal.color,
              boxShadow: `0 0 10px ${goal.color}80` 
            }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-medium">
          <span className="text-[var(--text-secondary)]">{formatMoney(goal.currentAmount)}</span>
          <span className="text-white">{formatMoney(goal.targetAmount)}</span>
        </div>
      </div>
    </div>
  );
}
