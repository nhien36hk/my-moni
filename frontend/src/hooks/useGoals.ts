import { useState, useEffect, useCallback } from 'react';
import { fetchWithAuth } from '../api/config';
import { useBudgetStore } from '../store/useBudgetStore';

export interface GoalData {
  _id: string;
  monthKey: string;
  targetAmount: number;
  actualAmount: number;
  status: 'ongoing' | 'success' | 'failed';
  type?: 'monthly' | 'yearly';
}

export function useGoals() {
  const [goals, setGoals] = useState<GoalData[]>([]);
  const [loading, setLoading] = useState(true);
  const { activeBudgetId } = useBudgetStore();

  const fetchGoals = useCallback(async () => {
    if (!activeBudgetId) return;

    setLoading(true);
    try {
      const response = await fetchWithAuth(`/goals?budgetId=${activeBudgetId}`);
      const result = await response.json();
      if (result.success) {
        setGoals(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeBudgetId]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const upsertGoal = async (monthKey: string, targetAmount: number, type?: 'monthly' | 'yearly') => {
    if (!activeBudgetId) return false;

    try {
      const response = await fetchWithAuth(`/goals`, {
        method: 'POST',
        body: JSON.stringify({ monthKey, targetAmount, budgetId: activeBudgetId, type: type || 'monthly' })
      });
      const result = await response.json();
      if (result.success) {
        await fetchGoals();
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const closeGoal = async (id: string, actualAmount: number) => {
    try {
      const response = await fetchWithAuth(`/goals/${id}/close`, {
        method: 'PUT',
        body: JSON.stringify({ actualAmount })
      });
      const result = await response.json();
      if (result.success) {
        await fetchGoals();
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return { goals, loading, upsertGoal, closeGoal, refetch: fetchGoals };
}
