import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import AddTransactionModal from './components/dashboard/AddTransactionModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Layout onAddClick={openModal}>
        <Dashboard />
      </Layout>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
}

export default App;
