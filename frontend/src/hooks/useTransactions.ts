import { useState, useEffect, useCallback } from 'react';
import { fetchWithAuth } from '../api/config';

export interface TransactionData {
  _id: string;
  name: string;
  amount: number;
  category: string;
  isIncome: boolean;
  date: string;
  description?: string;
}

export function useTransactions(startDate?: string, endDate?: string) {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      let endpoint = `/transactions`;
      if (startDate && endDate) {
        endpoint += `?startDate=${startDate}&endDate=${endDate}`;
      }
      
      const response = await fetchWithAuth(endpoint);
      const result = await response.json();
      
      if (result.success) {
        setTransactions(result.data);
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  // Lắng nghe sự kiện toàn cục để tự động đồng bộ hóa các component
  useEffect(() => {
    fetchTransactions();

    const handleUpdate = () => fetchTransactions();
    window.addEventListener('transactions_updated', handleUpdate);
    
    return () => {
      window.removeEventListener('transactions_updated', handleUpdate);
    };
  }, [fetchTransactions]);

  const addTransaction = async (data: Omit<TransactionData, '_id'>) => {
    const response = await fetchWithAuth(`/transactions`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.success) {
      window.dispatchEvent(new Event('transactions_updated')); // Thông báo cho mọi nơi cập nhật
      return true;
    }
    return false;
  };

  const deleteTransaction = async (id: string) => {
    const response = await fetchWithAuth(`/transactions/${id}`, {
      method: 'DELETE'
    });
    const result = await response.json();
    if (result.success) {
      window.dispatchEvent(new Event('transactions_updated')); // Thông báo cho mọi nơi cập nhật
      return true;
    }
    return false;
  };

  const updateTransaction = async (id: string, data: Partial<TransactionData>) => {
    const response = await fetchWithAuth(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.success) {
      window.dispatchEvent(new Event('transactions_updated')); // Thông báo cho mọi nơi cập nhật
      return true;
    }
    return false;
  };

  // Helper tính toán
  const income = transactions.filter(t => t.isIncome).reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => !t.isIncome).reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return { transactions, loading, error, addTransaction, deleteTransaction, updateTransaction, income, expense, balance, refetch: fetchTransactions };
}
