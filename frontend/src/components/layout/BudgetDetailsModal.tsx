import React, { useState } from 'react';
import { X, Settings, Copy, Check, Users, Shield } from 'lucide-react';
import type { Budget } from '../../store/useBudgetStore';

interface BudgetDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  budget: Budget | undefined;
}

export default function BudgetDetailsModal({ isOpen, onClose, budget }: BudgetDetailsModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !budget) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(budget._id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-[#1a1625] border border-white/10 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${budget.color || 'var(--accent-primary)'}20`, color: budget.color || 'var(--accent-primary)' }}
          >
            <Settings size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{budget.name}</h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {budget.type === 'family' ? 'Ví gia đình' : 'Ví cá nhân'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Mã ID */}
          <div className="bg-[#130f1c] rounded-2xl p-4 border border-white/5">
            <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              Mã mời (ID Ví)
            </label>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm text-[var(--accent-primary)] font-mono truncate bg-[var(--accent-primary)]/10 px-3 py-2 rounded-lg">
                {budget._id}
              </code>
              <button 
                onClick={handleCopy}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"
                title="Copy ID"
              >
                {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
              </button>
            </div>
            <p className="text-[10px] text-white/40 mt-2">Gửi mã này cho người thân để họ tham gia ví chung.</p>
          </div>

          {/* Thành viên */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
              <Users size={14} />
              Thành viên ({budget.members?.length || 0})
            </label>
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {budget.members?.map((member) => (
                <div key={member._id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white uppercase">
                      {member.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{member.name}</p>
                      <p className="text-[10px] text-white/50">@{member.username}</p>
                    </div>
                  </div>
                  {member._id === budget.owner && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-bold">
                      <Shield size={10} /> Chủ ví
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
