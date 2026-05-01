import type { ReactNode } from 'react';

export type GoalStatus = 'safe' | 'warning' | 'danger';

export interface Transaction {
  id: string;
  icon: ReactNode;
  name: string;
  category: string;
  amount: number;
  isIncome: boolean;
  date: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: ReactNode;
  color: string;
}

export interface StatusConfig {
  label: string;
  color: string;
  bg: string;
}
