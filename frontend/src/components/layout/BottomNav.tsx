import { LayoutDashboard, ArrowUpDown, Target, Plus, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface BottomNavProps {
  onAddClick: () => void;
}

export default function BottomNav({ onAddClick }: BottomNavProps) {
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
        <NavLink
          to="/"
          end
          className={({ isActive }) => 
            `flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors ${
              isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span className="text-[10px] font-medium">Tổng quan</span>
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) => 
            `flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors ${
              isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'
            }`
          }
        >
          <ArrowUpDown size={20} />
          <span className="text-[10px] font-medium">Giao dịch</span>
        </NavLink>

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

        <NavLink
          to="/goals"
          className={({ isActive }) => 
            `flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors ${
              isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'
            }`
          }
        >
          <Target size={20} />
          <span className="text-[10px] font-medium">Mục tiêu</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => 
            `flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors ${
              isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'
            }`
          }
        >
          <User size={20} />
          <span className="text-[10px] font-medium">Cá nhân</span>
        </NavLink>
      </div>
    </nav>
  );
}
