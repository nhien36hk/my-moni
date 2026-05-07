import {
  LayoutDashboard,
  ArrowUpDown,
  Target,
  Plus,
  Settings,
  LogOut,
} from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Tổng quan', id: 'dashboard' },
  { icon: <ArrowUpDown size={20} />, label: 'Giao dịch', id: 'transactions' },
  { icon: <Target size={20} />, label: 'Mục tiêu', id: 'goals' },
  { icon: <Settings size={20} />, label: 'Cài đặt', id: 'settings' },
];

export default function Sidebar() {
  const activeTab = 'dashboard';

  return (
    <aside
      className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0
                 border-r border-[var(--border-glass)]"
      style={{ background: 'rgba(15, 15, 35, 0.6)', backdropFilter: 'blur(20px)' }}
    >
      {/* Logo */}
      <div className="p-6 pb-2">
        <h1 className="text-xl font-extrabold gradient-text tracking-tight">
          <span className="italic pr-2">MyMony</span>
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Quản lý tài chính thông minh
        </p>
      </div>

      {/* Add Transaction Button */}
      <div className="px-4 py-4">
        <button
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                     text-white text-sm font-semibold transition-all
                     hover:opacity-90 active:scale-[0.97]"
          style={{
            background: 'var(--gradient-primary)',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
          }}
        >
          <Plus size={18} strokeWidth={2.5} />
          Thêm giao dịch
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl
                         text-sm font-medium transition-all
                ${
                  isActive
                    ? 'text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass)]'
                }`}
              style={
                isActive
                  ? {
                      background: 'rgba(99, 102, 241, 0.15)',
                      boxShadow: 'inset 0 0 0 1px rgba(99, 102, 241, 0.2)',
                    }
                  : undefined
              }
            >
              <span style={{ color: isActive ? 'var(--accent-indigo)' : undefined }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border-glass)]">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                     text-sm font-medium text-[var(--text-secondary)]
                     hover:text-[var(--danger)] hover:bg-[rgba(239,68,68,0.08)]
                     transition-colors"
        >
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
