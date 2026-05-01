import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatMoney } from '../../utils/format';

interface BalanceHeroProps {
  balance: number;
  income: number;
  expense: number;
}

export default function BalanceHero({ balance, income, expense }: BalanceHeroProps) {
  return (
    <section
      className="relative overflow-hidden rounded-3xl p-6 md:p-8"
      style={{
        background: 'var(--gradient-primary)',
        boxShadow: '0 20px 60px rgba(236, 72, 153, 0.25)',
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
        style={{ background: 'rgba(255,255,255,0.15)' }}
      />
      <div
        className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10"
        style={{ background: 'rgba(255,255,255,0.2)' }}
      />

      <p className="text-white/70 text-sm font-medium mb-1">Số dư hiện tại</p>
      <h2 className="text-3xl md:text-4xl font-extrabold text-white tabular-nums mb-6">
        {formatMoney(balance)}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {/* Income */}
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-2 text-white/60 mb-1.5">
            <TrendingUp size={14} />
            <span className="text-xs font-medium">Tổng thu</span>
          </div>
          <p className="text-white font-bold text-sm md:text-base tabular-nums">
            {formatMoney(income)}
          </p>
        </div>

        {/* Expense */}
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-2 text-white/60 mb-1.5">
            <TrendingDown size={14} />
            <span className="text-xs font-medium">Tổng chi</span>
          </div>
          <p className="text-white font-bold text-sm md:text-base tabular-nums">
            {formatMoney(expense)}
          </p>
        </div>
      </div>
    </section>
  );
}
