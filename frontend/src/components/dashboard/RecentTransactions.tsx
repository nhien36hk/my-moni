import TransactionItem from '../transactions/TransactionItem';
import type { TransactionData } from '../../hooks/useTransactions';
import { useModalStore } from '../../store/useModalStore';

interface RecentTransactionsProps {
  transactions: TransactionData[];
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
          <TransactionItem 
            key={tx._id} 
            transaction={tx} 
          />
        ))}
      </div>
    </section>
  );
}
