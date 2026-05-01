import {
  Bell,
  Settings,
  LayoutDashboard,
  ArrowUpDown,
  Target,
  Plus,
} from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: <LayoutDashboard size={16} />, label: 'Tổng quan', id: 'dashboard' },
  { icon: <ArrowUpDown size={16} />, label: 'Giao dịch', id: 'transactions' },
  { icon: <Target size={16} />, label: 'Mục tiêu', id: 'goals' },
];

export default function Header() {
  const activeTab = 'dashboard';

  const currentDate = new Date().toLocaleDateString('vi-VN', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--border-glass)]"
      style={{
        background: 'rgba(15, 15, 35, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-lg font-extrabold gradient-text tracking-tight leading-tight">
                BudgetFlow
              </h1>
              <p className="text-[10px] text-[var(--text-secondary)] capitalize md:hidden">
                {currentDate}
              </p>
            </div>

            {/* Desktop Navigation - Ẩn trên mobile */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                               transition-all
                      ${
                        isActive
                          ? 'text-white bg-[rgba(99,102,241,0.15)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass)]'
                      }`}
                  >
                    <span style={{ color: isActive ? 'var(--accent-indigo)' : undefined }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Desktop: Nút thêm giao dịch */}
            <button
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl
                         text-white text-sm font-semibold transition-all
                         hover:opacity-90 active:scale-[0.97]"
              style={{
                background: 'var(--gradient-primary)',
                boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
              }}
            >
              <Plus size={16} strokeWidth={2.5} />
              Thêm giao dịch
            </button>

            {/* Notification Bell */}
            <button
              className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center
                         bg-[var(--bg-glass)] border border-[var(--border-glass)]
                         hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              aria-label="Thông báo"
            >
              <Bell size={16} className="text-[var(--text-secondary)]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--danger)] rounded-full" />
            </button>

            {/* Settings */}
            <button
              className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center
                         bg-[var(--bg-glass)] border border-[var(--border-glass)]
                         hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              aria-label="Cài đặt"
            >
              <Settings size={16} className="text-[var(--text-secondary)]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
