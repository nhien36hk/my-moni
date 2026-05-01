import type { Transaction } from '../../types/dashboard';
import { formatMoney } from '../../utils/format';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
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
        {transactions.map((tx) => (
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
                  ? 'rgba(16, 185, 129, 0.12)'
                  : 'rgba(251, 207, 232, 0.15)',
                color: tx.isIncome ? 'var(--success)' : 'var(--accent-primary)',
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
  );
}
