import { create } from 'zustand';
import type { TransactionData } from '../hooks/useTransactions';

interface ModalState {
  isOpen: boolean;
  transactionToEdit: TransactionData | null;
  openModal: (tx?: TransactionData) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  transactionToEdit: null,
  openModal: (tx) => set({ 
    isOpen: true, 
    transactionToEdit: tx || null 
  }),
  closeModal: () => set({ 
    isOpen: false, 
    transactionToEdit: null 
  }),
}));
