import { create } from 'zustand';
import { fetchWithAuth } from '../api/config';

export interface BudgetMember {
  _id: string;
  name: string;
  username: string;
  email: string;
}

export interface Budget {
  _id: string;
  name: string;
  type: 'personal' | 'family';
  owner: string;
  members: BudgetMember[];
  color: string;
}

interface BudgetState {
  budgets: Budget[];
  activeBudgetId: string | null;
  loading: boolean;
  error: string | null;
  
  fetchBudgets: () => Promise<void>;
  setActiveBudget: (id: string) => void;
  getActiveBudget: () => Budget | undefined;
  joinBudget: (budgetId: string) => Promise<{ success: boolean; error?: string }>;
}

export const useBudgetStore = create<BudgetState>((set, get) => ({
  budgets: [],
  activeBudgetId: localStorage.getItem('activeBudgetId'),
  loading: false,
  error: null,

  fetchBudgets: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchWithAuth('/budgets');
      const result = await response.json();

      if (result.success) {
        const data: Budget[] = result.data;
        if (data.length === 0) return;

        let currentId = localStorage.getItem('activeBudgetId');

        // Nếu chưa có ví active hoặc ví cũ không còn tồn tại trong danh sách mới
        if (!currentId || !data.find(b => b._id === currentId)) {
          // Ưu tiên chọn ví cá nhân làm mặc định
          const personalBudget = data.find(b => b.type === 'personal') || data[0];
          currentId = personalBudget._id;
          localStorage.setItem('activeBudgetId', currentId);
        }

        set({ 
          budgets: data, 
          activeBudgetId: currentId,
          loading: false 
        });
      } else {
        set({ error: result.error, loading: false });
      }
    } catch (err) {
      set({ error: 'Không thể kết nối máy chủ', loading: false });
    }
  },

  setActiveBudget: (id: string) => {
    localStorage.setItem('activeBudgetId', id);
    set({ activeBudgetId: id });
    // Reload lại trang để các hook khác lấy dữ liệu mới theo budgetId
    window.location.reload(); 
  },

  getActiveBudget: () => {
    const { budgets, activeBudgetId } = get();
    return budgets.find(b => b._id === activeBudgetId);
  },

  joinBudget: async (budgetId: string) => {
    try {
      const response = await fetchWithAuth('/budgets/join', {
        method: 'POST',
        body: JSON.stringify({ budgetId })
      });
      const result = await response.json();

      if (result.success) {
        await get().fetchBudgets(); // Refresh danh sách ví
        get().setActiveBudget(budgetId); // Auto switch sang ví vừa join
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch (err: any) {
      return { success: false, error: 'Không thể kết nối máy chủ' };
    }
  }
}));
