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
import type { Transaction } from './types/dashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  const openModal = () => {
    setTransactionToEdit(null); // Reset khi thêm mới
    setIsModalOpen(true);
  };

  const openEditModal = (tx: Transaction) => {
    setTransactionToEdit(tx);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTransactionToEdit(null);
  };

  return (
    <AuthProvider>
      <Routes>
        {/* Auth Routes - Không dùng Layout chung */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main App Routes - Dùng Layout chung */}
        <Route path="/" element={<Layout onAddClick={openModal} />}>
          <Route index element={<Dashboard onEditTransaction={openEditModal} />} />
          <Route path="transactions" element={<Transactions onEditTransaction={openEditModal} />} />
          <Route path="goals" element={<Goals />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      {/* Modal chỉ render khi đang mở, tránh gọi hook khi không cần */}
      {isModalOpen && (
        <AddTransactionModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          transactionToEdit={transactionToEdit}
        />
      )}
    </AuthProvider>
  );
}

export default App;
