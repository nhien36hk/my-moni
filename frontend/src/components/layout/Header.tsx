import { Bell, Settings, Plus } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

interface HeaderProps {
  onAddClick: () => void;
}

export default function Header({ onAddClick }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: 'rgba(15, 11, 23, 0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-glass)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <h1
              className="text-xl font-black italic tracking-tighter"
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              BudgetFlow
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-2xl">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                `px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive ? 'bg-white/10 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'
                }`
              }
            >
              Tổng quan
            </NavLink>
            <NavLink 
              to="/transactions" 
              className={({ isActive }) => 
                `px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive ? 'bg-white/10 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'
                }`
              }
            >
              Giao dịch
            </NavLink>
            <NavLink 
              to="/goals" 
              className={({ isActive }) => 
                `px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive ? 'bg-white/10 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'
                }`
              }
            >
              Mục tiêu
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={onAddClick}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-[1.02] active:scale-95"
              style={{
                background: 'var(--gradient-primary)',
                boxShadow: '0 4px 20px rgba(244, 114, 182, 0.3)',
              }}
            >
              <Plus size={16} strokeWidth={3} />
              Thêm giao dịch
            </button>

            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
              <button className="p-1.5 text-[var(--text-secondary)] hover:text-white transition-colors relative">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[var(--danger)] rounded-full border border-[var(--bg-primary)]"></span>
              </button>
              <Link to="/settings" className="p-1.5 text-[var(--text-secondary)] hover:text-white transition-colors">
                <Settings size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
