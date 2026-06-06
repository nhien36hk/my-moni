import React, { useState } from 'react';
import { User, Lock, Mail, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthActions } from '../hooks/useAuthActions';

export default function Login() {
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const { handleLogin, handleForgotPassword, isLoading, error, setError } = useAuthActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    if (isForgotMode) {
      const result = await handleForgotPassword(forgotEmail);
      if (result.success) {
        setSuccessMessage(result.message || 'Mật khẩu mới đã được gửi thành công!');
      }
    } else {
      await handleLogin(identifier, password);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col justify-center px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        <div className="space-y-2 mb-8 text-center">
          <h2 className="text-3xl font-black text-white italic tracking-tight pr-2">MyMony</h2>
          <p className="text-[var(--text-secondary)] text-sm">
            {isForgotMode ? 'Khôi phục tài khoản của bạn' : 'Chào mừng bạn quay trở lại!'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center">
              {successMessage}
            </div>
          )}

          {!isForgotMode ? (
            // Form Đăng Nhập
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/60 ml-1">Username hoặc Email</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      type="text" 
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="username hoặc email..."
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-[var(--accent-primary)] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-bold text-white/60">Mật khẩu</label>
                    <button 
                      type="button"
                      onClick={() => {
                        setIsForgotMode(true);
                        setError(null);
                        setSuccessMessage(null);
                      }}
                      className="text-xs font-bold text-[var(--accent-primary)] hover:underline cursor-pointer"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
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
            </>
          ) : (
            // Form Quên Mật Khẩu
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/60 ml-1">Email đăng ký</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      type="email" 
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="email@example.com"
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
                {isLoading ? 'Đang gửi...' : 'Gửi mật khẩu tạm thời'} <ChevronRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsForgotMode(false);
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 text-xs border border-white/5"
              >
                <ArrowLeft size={14} /> Quay lại đăng nhập
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
