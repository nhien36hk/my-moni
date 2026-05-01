import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Check } from 'lucide-react';

interface EditGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount: number;
  month: string;
  onSave: (amount: number) => void;
}

export default function EditGoalModal({ isOpen, onClose, initialAmount, month, onSave }: EditGoalModalProps) {
  const [amount, setAmount] = useState(initialAmount.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setAmount(initialAmount.toString());
      // Focus vào input sau khi animation mở hoàn tất
      const timer = setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialAmount]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onSave(Number(amount));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay cố định không dùng animation phức tạp để test */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md bg-[#1a1625] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="text-[var(--accent-primary)]" size={20} />
            <h3 className="text-lg font-bold text-white">Mục tiêu {month}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/40">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="text-center space-y-3">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[2px]">Số tiền kỳ vọng</p>
            <div className="flex items-center justify-center gap-2">
              <input
                ref={inputRef}
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-center text-4xl font-black text-white outline-none w-full"
              />
            </div>
            <p className="text-xs text-[var(--accent-primary)] font-bold">VND</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[5, 10, 15].map(v => (
              <button
                key={v}
                type="button"
                onClick={() => setAmount((v * 1000000).toString())}
                className="py-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-bold text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all"
              >
                {v} Triệu
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-2xl font-bold text-white shadow-lg shadow-pink-500/20"
          >
            Lưu thay đổi
          </button>
        </form>
      </motion.div>
    </div>
  );
}
