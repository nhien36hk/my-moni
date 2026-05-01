import { LayoutDashboard, ArrowUpDown, Target, Plus } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  id: string;
}

interface BottomNavProps {
  onAddClick: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Tổng quan', id: 'dashboard' },
  { icon: <ArrowUpDown size={20} />, label: 'Giao dịch', id: 'transactions' },
  { icon: <Target size={20} />, label: 'Mục tiêu', id: 'goals' },
];

export default function BottomNav({ onAddClick }: BottomNavProps) {
  const activeTab = 'dashboard';

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'rgba(15, 11, 23, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border-glass)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto relative">
        {/* Nav items bên trái */}
        {NAV_ITEMS.slice(0, 2).map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors
              ${
                activeTab === item.id
                  ? 'text-[var(--accent-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}

        {/* Nút FAB ở giữa */}
        <button
          onClick={onAddClick}
          className="w-14 h-14 -mt-8 rounded-2xl flex items-center justify-center
                     text-white shadow-lg transition-transform active:scale-90"
          style={{
            background: 'var(--gradient-primary)',
            boxShadow: '0 8px 30px rgba(244, 114, 182, 0.4)',
          }}
          aria-label="Thêm giao dịch"
        >
          <Plus size={26} strokeWidth={2.5} />
        </button>

        {/* Nav items bên phải */}
        {NAV_ITEMS.slice(2).map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors
              ${
                activeTab === item.id
                  ? 'text-[var(--accent-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
