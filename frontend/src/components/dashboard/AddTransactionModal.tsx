import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plus, 
  Minus, 
  Utensils, 
  Car, 
  ShoppingBag, 
  Zap, 
  Gamepad2, 
  Wallet,
  Pencil
} from 'lucide-react';

import type { Transaction } from '../../types/dashboard';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionToEdit?: Transaction | null;
}

const COMMON_CATEGORIES = [
  { id: '1', name: 'Ăn uống', icon: <Utensils size={20} />, color: '#f472b6' },
  { id: '2', name: 'Di chuyển', icon: <Car size={20} />, color: '#c084fc' },
  { id: '3', name: 'Mua sắm', icon: <ShoppingBag size={20} />, color: '#fb7185' },
  { id: '4', name: 'Hóa đơn', icon: <Zap size={20} />, color: '#fbbf24' },
  { id: '5', name: 'Giải trí', icon: <Gamepad2 size={20} />, color: '#60a5fa' },
  { id: '6', name: 'Khác', icon: <Wallet size={20} />, color: '#94a3b8' },
];

import { useTransactions } from '../../hooks/useTransactions';

export default function AddTransactionModal({ isOpen, onClose, transactionToEdit }: AddTransactionModalProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedCat, setSelectedCat] = useState(COMMON_CATEGORIES[0].name);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const amountInputRef = useRef<HTMLInputElement>(null);
  
  const { addTransaction, updateTransaction } = useTransactions();

  // Auto focus vào ô nhập tiền và init data nếu là sửa
  useEffect(() => {
    if (isOpen) {
      if (transactionToEdit) {
        setType(transactionToEdit.isIncome ? 'income' : 'expense');
        setAmount(transactionToEdit.amount.toString());
        setNote(transactionToEdit.name);
        setSelectedCat(transactionToEdit.category);
      } else {
        setAmount('');
        setNote(COMMON_CATEGORIES[0].name);
        setType('expense');
        setSelectedCat(COMMON_CATEGORIES[0].name);
      }
      setTimeout(() => amountInputRef.current?.focus(), 300);
    } else {
      setIsSubmitting(false);
    }
  }, [isOpen, transactionToEdit]);

  const handleSelectCategory = (catName: string) => {
    setSelectedCat(catName);
    setNote(catName); // Tự động điền note theo danh mục để nhanh hơn
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isSubmitting) return;
    
    setIsSubmitting(true);
    const data = {
      name: note || selectedCat,
      amount: Number(amount),
      category: selectedCat,
      isIncome: type === 'income',
      date: transactionToEdit ? transactionToEdit.date : new Date().toISOString()
    };

    let success = false;
    if (transactionToEdit) {
      success = await updateTransaction(transactionToEdit.id, data);
    } else {
      success = await addTransaction(data);
    }

    if (success) {
      onClose();
    } else {
      alert("Có lỗi xảy ra khi lưu giao dịch!");
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center pointer-events-none p-4">
            <motion.div
              initial={{ y: '100%', opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg pointer-events-auto overflow-hidden
                         glass-card !bg-[#1a1625]/95 border-[rgba(255,255,255,0.1)]
                         shadow-[0_-10px_40px_rgba(244,114,182,0.15)] md:shadow-[0_0_50px_rgba(244,114,182,0.2)]"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <h3 className="text-lg font-bold text-white">
                  {transactionToEdit ? 'Chỉnh sửa giao dịch' : 'Thêm giao dịch mới'}
                </h3>
                <button 
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X size={18} className="text-white/60" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Income / Expense Toggle */}
                <div className="flex p-1 bg-white/5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setType('expense')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all
                      ${type === 'expense' 
                        ? 'bg-[var(--danger)] text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                        : 'text-white/40 hover:text-white/60'}`}
                  >
                    <Minus size={16} /> Chi tiêu
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('income')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all
                      ${type === 'income' 
                        ? 'bg-[var(--success)] text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                        : 'text-white/40 hover:text-white/60'}`}
                  >
                    <Plus size={16} /> Thu nhập
                  </button>
                </div>

                {/* Amount Input */}
                <div className="text-center space-y-2 py-2">
                  <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Số tiền giao dịch</p>
                  <div className="relative flex items-center justify-center">
                    <input
                      ref={amountInputRef}
                      type="number"
                      inputMode="decimal"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-transparent text-center text-5xl font-black text-white outline-none placeholder:text-white/10"
                    />
                  </div>
                </div>

                {/* Note / Description Input */}
                <div className="space-y-3">
                   <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Ghi chú / Tiêu đề</p>
                   <div className="relative flex items-center bg-white/5 rounded-2xl border border-white/5 px-4 focus-within:border-white/20 transition-all">
                      <Pencil size={16} className="text-white/20 mr-3" />
                      <input
                        type="text"
                        placeholder="Nội dung giao dịch..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full py-4 bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                      />
                   </div>
                </div>

                {/* Categories Grid */}
                <div className="space-y-3">
                  <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Danh mục phổ biến</p>
                  <div className="grid grid-cols-3 gap-3">
                    {COMMON_CATEGORIES.map((cat) => {
                      const isSelected = selectedCat === cat.name;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleSelectCategory(cat.name)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all
                            ${isSelected 
                              ? 'bg-white/10 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                              : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                        >
                          <div 
                            className="w-10 h-10 flex items-center justify-center rounded-xl"
                            style={{ 
                              background: `${cat.color}20`,
                              color: cat.color,
                              boxShadow: isSelected ? `0 0 12px ${cat.color}40` : 'none'
                            }}
                          >
                            {cat.icon}
                          </div>
                          <span className={`text-[10px] font-medium ${isSelected ? 'text-white' : 'text-white/40'}`}>
                            {cat.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-bold text-white transition-all
                             bg-gradient-to-r from-[#f472b6] via-[#e879f9] to-[#fb7185]
                             shadow-[0_10px_25px_rgba(244,114,182,0.4)]
                             hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? 'Đang lưu...' : (transactionToEdit ? 'Lưu thay đổi' : 'Xác nhận giao dịch')}
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
