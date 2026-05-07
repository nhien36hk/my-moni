import React from 'react';
import { 
  Utensils, 
  Car, 
  Zap, 
  ShoppingBag, 
  Wallet, 
  CircleDollarSign,
  Banknote,
  Briefcase,
  Video,
  Gift,
  TrendingUp,
  Gamepad2
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
    // Chi tiêu
    case 'Ăn uống': return <Utensils size={size} />;
    case 'Di chuyển': return <Car size={size} />;
    case 'Hóa đơn': return <Zap size={size} />;
    case 'Mua sắm': return <ShoppingBag size={size} />;
    case 'Giải trí': return <Gamepad2 size={size} />;
    
    // Thu nhập
    case 'Lương': return <Banknote size={size} />;
    case 'Tiền làm thêm': return <Briefcase size={size} />;
    case 'Livestream': return <Video size={size} />;
    case 'Quà tặng': return <Gift size={size} />;
    case 'Đầu tư': return <TrendingUp size={size} />;
    
    // Mặc định
    case 'Khác':
    default: return <Wallet size={size} />;
  }
};

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const openModal = useModalStore(state => state.openModal);
  const { name, category, amount, isIncome, date } = transaction;
  const formattedDate = new Date(date).toLocaleDateString('vi-VN');

  return (
    <div
      onClick={() => openModal(transaction)}
      className="group flex items-center gap-3 p-3 rounded-2xl
                 hover:bg-white/5 active:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/5"
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
        <div className="flex items-center gap-2 mt-0.5">
          <p className="text-[10px] text-[var(--text-secondary)]">
            {category} • {formattedDate}
          </p>
          {transaction.created_by && (
            <span className="px-1.5 py-0.5 rounded-md bg-white/5 text-[9px] font-bold text-white/30 border border-white/5">
              {transaction.created_by.full_name}
            </span>
          )}
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-3">
        <p
          className="text-sm font-bold tabular-nums shrink-0"
          style={{ color: isIncome ? 'var(--success)' : 'var(--danger)' }}
        >
          {isIncome ? '+' : '-'}{formatMoney(amount)}
        </p>
      </div>
    </div>
  );
}
