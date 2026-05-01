import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Utensils,
  Car,
  ShoppingBag,
  Zap,
  Droplets,
} from 'lucide-react';

/* ========== MOCK DATA (Sẽ thay bằng API sau) ========== */
const MOCK_BALANCE = 12_500_000;
const MOCK_INCOME = 20_000_000;
const MOCK_EXPENSE = 7_500_000;
const MOCK_SAVING_GOAL = 10_000_000;

type GoalStatus = 'safe' | 'warning' | 'danger';

function getGoalStatus(balance: number, goal: number): GoalStatus {
  if (balance > goal) return 'safe';
  if (balance === goal) return 'warning';
  return 'danger';
}

const STATUS_CONFIG: Record<GoalStatus, { label: string; color: string; bg: string }> = {
  safe: { label: 'An toàn', color: 'var(--success)', bg: 'rgba(34, 197, 94, 0.15)' },
  warning: { label: 'Cẩn thận', color: 'var(--warning)', bg: 'rgba(245, 158, 11, 0.15)' },
  danger: { label: 'Nguy hiểm', color: 'var(--danger)', bg: 'rgba(239, 68, 68, 0.15)' },
};

interface Transaction {
  id: string;
  icon: React.ReactNode;
  name: string;
  category: string;
  amount: number;
  isIncome: boolean;
  date: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', icon: <Wallet size={18} />, name: 'Lương tháng 5', category: 'Thu nhập', amount: 15_000_000, isIncome: true, date: 'Hôm nay' },
  { id: '2', icon: <Utensils size={18} />, name: 'Ăn trưa', category: 'Ăn uống', amount: 55_000, isIncome: false, date: 'Hôm nay' },
  { id: '3', icon: <Car size={18} />, name: 'Đổ xăng', category: 'Di chuyển', amount: 200_000, isIncome: false, date: 'Hôm qua' },
  { id: '4', icon: <Zap size={18} />, name: 'Tiền điện', category: 'Hóa đơn', amount: 450_000, isIncome: false, date: 'Hôm qua' },
  { id: '5', icon: <ShoppingBag size={18} />, name: 'Mua đồ', category: 'Mua sắm', amount: 350_000, isIncome: false, date: '28/04' },
  { id: '6', icon: <Droplets size={18} />, name: 'Tiền nước', category: 'Hóa đơn', amount: 120_000, isIncome: false, date: '27/04' },
];

/* ========== HELPER ========== */
function formatMoney(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
}

/* ========== COMPONENT ========== */
export default function Dashboard() {
  const status = getGoalStatus(MOCK_BALANCE, MOCK_SAVING_GOAL);
  const statusCfg = STATUS_CONFIG[status];
  const goalPercent = Math.min((MOCK_BALANCE / MOCK_SAVING_GOAL) * 100, 100);

  return (
    <div className="space-y-5">
      {/* ===== HERO BALANCE CARD ===== */}
      <section
        className="relative overflow-hidden rounded-3xl p-6 md:p-8"
        style={{
          background: 'var(--gradient-primary)',
          boxShadow: '0 20px 60px rgba(99, 102, 241, 0.25)',
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
          {formatMoney(MOCK_BALANCE)}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* Income */}
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 text-white/60 mb-1.5">
              <TrendingUp size={14} />
              <span className="text-xs font-medium">Tổng thu</span>
            </div>
            <p className="text-white font-bold text-sm md:text-base tabular-nums">
              {formatMoney(MOCK_INCOME)}
            </p>
          </div>

          {/* Expense */}
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 text-white/60 mb-1.5">
              <TrendingDown size={14} />
              <span className="text-xs font-medium">Tổng chi</span>
            </div>
            <p className="text-white font-bold text-sm md:text-base tabular-nums">
              {formatMoney(MOCK_EXPENSE)}
            </p>
          </div>
        </div>
      </section>

      {/* ===== SAVING GOAL CARD ===== */}
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
            {formatMoney(MOCK_BALANCE)} / {formatMoney(MOCK_SAVING_GOAL)}
          </p>
          <p className="text-xs font-medium" style={{ color: statusCfg.color }}>
            {goalPercent.toFixed(0)}%
          </p>
        </div>
      </section>

      {/* ===== RECENT TRANSACTIONS ===== */}
      <section className="glass-card p-5 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-sm text-[var(--text-primary)]">
            Giao dịch gần đây
          </h3>
          <button className="text-xs font-medium text-[var(--accent-indigo)] hover:underline">
            Xem tất cả
          </button>
        </div>

        <div className="space-y-1">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div
              key={tx.id}
              className="group flex items-center gap-3 p-3 rounded-2xl
                         hover:bg-[rgba(255,255,255,0.03)] transition-colors cursor-pointer"
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                           transition-transform group-hover:scale-105"
                style={{
                  background: tx.isIncome
                    ? 'rgba(34, 197, 94, 0.12)'
                    : 'rgba(99, 102, 241, 0.12)',
                  color: tx.isIncome ? 'var(--success)' : 'var(--accent-indigo)',
                }}
              >
                {tx.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                  {tx.name}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {tx.category} • {tx.date}
                </p>
              </div>

              {/* Amount */}
              <p
                className="text-sm font-bold tabular-nums shrink-0"
                style={{ color: tx.isIncome ? 'var(--success)' : 'var(--danger)' }}
              >
                {tx.isIncome ? '+' : '-'}{formatMoney(tx.amount)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
