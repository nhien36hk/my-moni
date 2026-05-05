import React, { useState } from 'react';
import { Mail, Lock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthActions } from '../hooks/useAuthActions';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, isLoading, error } = useAuthActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <div className="min-h-[90vh] flex flex-col justify-center px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        <div className="space-y-2 mb-8 text-center">
          <h2 className="text-3xl font-black text-white italic tracking-tighter">BudgetFlow</h2>
          <p className="text-[var(--text-secondary)] text-sm">Chào mừng bạn quay trở lại!</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-[var(--accent-primary)] transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 ml-1">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-[var(--accent-primary)] transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-2xl font-bold text-white shadow-[0_10px_30px_rgba(244,114,182,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? 'Đang xử lý...' : 'Đăng nhập'} <ChevronRight size={18} />
          </button>

          <p className="text-center text-xs text-[var(--text-secondary)]">
            Chưa có tài khoản? <Link to="/register" className="text-[var(--accent-primary)] font-bold cursor-pointer hover:underline">Đăng ký ngay</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
