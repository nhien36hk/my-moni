import React, { useState, useRef, useEffect } from 'react';
import { Wallet, ChevronDown, Check, Users, User } from 'lucide-react';
import { useBudgetStore } from '../../store/useBudgetStore';

export default function BudgetSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { budgets, activeBudgetId, setActiveBudget, getActiveBudget } = useBudgetStore();
  
  const activeBudget = getActiveBudget();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!activeBudget) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all active:scale-95"
      >
        <div 
          className="w-2 h-2 rounded-full" 
          style={{ backgroundColor: activeBudget.color || 'var(--accent-primary)' }}
        ></div>
        <span className="text-xs font-bold text-white max-w-[80px] truncate">
          {activeBudget.name}
        </span>
        <ChevronDown size={14} className={`text-white/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 glass-card p-2 border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-200 z-50">
          <p className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-white/30">Chọn ngân quỹ</p>
          
          <div className="space-y-1">
            {budgets.map((budget) => (
              <button
                key={budget._id}
                onClick={() => {
                  setActiveBudget(budget._id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all ${
                  activeBudgetId === budget._id 
                    ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5">
                    {budget.type === 'family' ? <Users size={16} /> : <User size={16} />}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold">{budget.name}</p>
                    <p className="text-[10px] opacity-50">{budget.type === 'family' ? 'Gia đình' : 'Cá nhân'}</p>
                  </div>
                </div>
                {activeBudgetId === budget._id && <Check size={14} />}
              </button>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-white/5">
            <button className="w-full flex items-center gap-3 p-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold">
              <PlusIcon />
              Tạo ví gia đình mới
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PlusIcon() {
  return (
    <div className="w-8 h-8 rounded-lg border border-dashed border-white/20 flex items-center justify-center">
      <span className="text-lg">+</span>
    </div>
  );
}
