import { formatMoney } from '../../utils/format';
import type { StatusConfig } from '../../types/dashboard';

interface SavingGoalProps {
  balance: number;
  goal: number;
  statusCfg: StatusConfig;
}

export default function SavingGoal({ balance, goal, statusCfg }: SavingGoalProps) {
  const goalPercent = Math.min((balance / goal) * 100, 100);

  return (
    <section className="glass-card p-5 md:p-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-sm text-[var(--text-primary)]">
          Mục tiêu tiết kiệm
        </h3>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ color: statusCfg.color, background: statusCfg.bg }}
        >
          {statusCfg.label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2.5 rounded-full overflow-hidden bg-[rgba(255,255,255,0.06)]">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${goalPercent}%`,
            background: statusCfg.color,
            boxShadow: `0 0 12px ${statusCfg.color}`,
          }}
        />
      </div>

      <div className="flex justify-between items-center mt-2.5">
        <p className="text-xs text-[var(--text-secondary)]">
          {formatMoney(balance)} / {formatMoney(goal)}
        </p>
        <p className="text-xs font-medium" style={{ color: statusCfg.color }}>
          {goalPercent.toFixed(0)}%
        </p>
      </div>
    </section>
  );
}
