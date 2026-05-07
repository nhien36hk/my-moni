import { Bell, Settings, Plus } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useModalStore } from '../../store/useModalStore';
import BudgetSwitcher from './BudgetSwitcher';

export default function Header() {
  const openModal = useModalStore(state => state.openModal);
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
              className="text-xl font-black italic tracking-tight pr-2"
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              MyMony
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
            <NavLink 
              to="/settings" 
              className={({ isActive }) => 
                `px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive ? 'bg-white/10 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'
                }`
              }
            >
              Cá nhân
            </NavLink>

          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => openModal()}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-[1.02] active:scale-95"
              style={{
                background: 'var(--gradient-primary)',
                boxShadow: '0 4px 20px rgba(244, 114, 182, 0.3)',
              }}
            >
              <Plus size={16} strokeWidth={3} />
              Giao dịch
            </button>

            <BudgetSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
