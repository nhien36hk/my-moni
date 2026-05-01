import { Wallet, Utensils, Car, ShoppingBag, Zap, Droplets } from 'lucide-react';
import type { Transaction, GoalStatus, StatusConfig } from '../types/dashboard';
import BalanceHero from '../components/dashboard/BalanceHero';
import SavingGoal from '../components/dashboard/SavingGoal';
import RecentTransactions from '../components/dashboard/RecentTransactions';

/* ========== MOCK DATA (Sẽ thay bằng API sau) ========== */
const MOCK_BALANCE = 12_500_000;
const MOCK_INCOME = 20_000_000;
const MOCK_EXPENSE = 7_500_000;
const MOCK_SAVING_GOAL = 10_000_000;

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', icon: <Wallet size={18} />, name: 'Lương tháng 5', category: 'Thu nhập', amount: 15_000_000, isIncome: true, date: 'Hôm nay' },
  { id: '2', icon: <Utensils size={18} />, name: 'Ăn trưa', category: 'Ăn uống', amount: 55_000, isIncome: false, date: 'Hôm nay' },
  { id: '3', icon: <Car size={18} />, name: 'Đổ xăng', category: 'Di chuyển', amount: 200_000, isIncome: false, date: 'Hôm qua' },
  { id: '4', icon: <Zap size={18} />, name: 'Tiền điện', category: 'Hóa đơn', amount: 450_000, isIncome: false, date: 'Hôm qua' },
  { id: '5', icon: <ShoppingBag size={18} />, name: 'Mua đồ', category: 'Mua sắm', amount: 350_000, isIncome: false, date: '28/04' },
  { id: '6', icon: <Droplets size={18} />, name: 'Tiền nước', category: 'Hóa đơn', amount: 120_000, isIncome: false, date: '27/04' },
];

const STATUS_CONFIG: Record<GoalStatus, StatusConfig> = {
  safe: { label: 'An toàn', color: 'var(--success)', bg: 'rgba(16, 185, 129, 0.15)' },
  warning: { label: 'Cẩn thận', color: 'var(--warning)', bg: 'rgba(245, 158, 11, 0.15)' },
  danger: { label: 'Nguy hiểm', color: 'var(--danger)', bg: 'rgba(239, 68, 68, 0.15)' },
};

/* ========== LOGIC HELPERS ========== */
function getGoalStatus(balance: number, goal: number): GoalStatus {
  if (balance > goal) return 'safe';
  if (balance === goal) return 'warning';
  return 'danger';
}

/* ========== MAIN COMPONENT ========== */
export default function Dashboard() {
  const status = getGoalStatus(MOCK_BALANCE, MOCK_SAVING_GOAL);
  const statusCfg = STATUS_CONFIG[status];

  return (
    <div className="space-y-5">
      <BalanceHero 
        balance={MOCK_BALANCE} 
        income={MOCK_INCOME} 
        expense={MOCK_EXPENSE} 
      />

      <SavingGoal 
        balance={MOCK_BALANCE} 
        goal={MOCK_SAVING_GOAL} 
        statusCfg={statusCfg} 
      />

      <RecentTransactions 
        transactions={MOCK_TRANSACTIONS} 
      />
    </div>
  );
}
