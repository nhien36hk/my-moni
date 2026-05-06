import React from 'react';
import { 
  Utensils, 
  Car, 
  Zap, 
  ShoppingBag, 
  Wallet, 
  CircleDollarSign,
  Pencil 
} from 'lucide-react';
import { formatMoney } from '../../utils/format';
import type { TransactionData } from '../../hooks/useTransactions';
import { useModalStore } from '../../store/useModalStore';

interface TransactionItemProps {
  transaction: TransactionData;
}

const getCategoryIcon = (category: string) => {
  const size = 18;
  switch (category) {
    case 'Ăn uống': return <Utensils size={size} />;
    case 'Di chuyển': return <Car size={size} />;
    case 'Hóa đơn': return <Zap size={size} />;
    case 'Mua sắm': return <ShoppingBag size={size} />;
    case 'Thu nhập': return <Wallet size={size} />;
    default: return <CircleDollarSign size={size} />;
  }
};

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const openModal = useModalStore(state => state.openModal);
  const { name, category, amount, isIncome, date } = transaction;
  const formattedDate = new Date(date).toLocaleDateString('vi-VN');

  return (
    <div
      className="group flex items-center gap-3 p-3 rounded-2xl
                 hover:bg-[rgba(255,255,255,0.03)] transition-colors cursor-pointer"
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                   transition-transform group-hover:scale-105"
        style={{
          background: isIncome
            ? 'rgba(16, 185, 129, 0.12)'
            : 'rgba(251, 207, 232, 0.15)',
          color: isIncome ? 'var(--success)' : 'var(--accent-primary)',
        }}
      >
        {getCategoryIcon(category)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
          {name}
        </p>
        <p className="text-xs text-[var(--text-secondary)]">
          {category} • {formattedDate}
        </p>
      </div>

      {/* Amount & Edit */}
      <div className="flex items-center gap-3">
        <p
          className="text-sm font-bold tabular-nums shrink-0"
          style={{ color: isIncome ? 'var(--success)' : 'var(--danger)' }}
        >
          {isIncome ? '+' : '-'}{formatMoney(amount)}
        </p>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            openModal(transaction);
          }}
          className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5"
        >
          <Pencil size={10} />
        </button>
      </div>
    </div>
  );
}
