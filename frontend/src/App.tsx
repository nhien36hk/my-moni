import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Goals from './pages/Goals';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import AddTransactionModal from './components/dashboard/AddTransactionModal';
import type { TransactionData } from './hooks/useTransactions';
import { AuthProvider } from './context/AuthContext';

import { useModalStore } from './store/useModalStore';

function App() {
  const isOpen = useModalStore(state => state.isOpen);

  return (
    <AuthProvider>
      <Routes>
        {/* Auth Routes - Không dùng Layout chung */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main App Routes - Dùng Layout chung */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="goals" element={<Goals />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      {/* Modal tự quản lý thông qua Zustand Store */}
      {isOpen && <AddTransactionModal />}
    </AuthProvider>
  );
}

export default App;
