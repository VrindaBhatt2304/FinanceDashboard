import React, { useState } from 'react';
import Layout from './components/Layout';
import StatCard from './components/StatCard';
import InsightsList from './components/InsightsList';
import { BalanceTrend, SpendingBreakdown } from './components/DashboardCharts';
import TransactionTable from './components/TransactionTable';
import TransactionFilters from './components/TransactionFilters';
import TransactionModal from './components/TransactionModal';
import { useFinance } from './hooks/useFinance';
import { Plus } from 'lucide-react';

function App() {
  const {
    filteredTransactions,
    stats,
    role,
    setRole,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    addTransaction,
    deleteTransaction,
    updateTransaction
  } = useFinance();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile toggle
  const [sortOrder, setSortOrder] = useState('newest');
  const [mode, setMode] = useState('light'); // light or dark mode

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      role={role}
      setRole={setRole}
      mode={mode}
      setMode={setMode}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      isOpen={isSidebarOpen}
      setIsOpen={setIsSidebarOpen}
    >
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className={`text-3xl font-extrabold tracking-tight ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {activeTab === 'dashboard' ? 'Financial Overview' : 
             activeTab === 'transactions' ? 'Transactions History' : 'Financial Insights'}
          </h2>
          <p className="text-slate-500 mt-1">
            Viewing as <span className={`font-bold uppercase ${role === 'admin' ? 'text-blue-900' : 'text-slate-400'}`}>
              {role}
            </span>
          </p>
        </div>

        
        {role === 'admin' && activeTab === 'transactions' && (
          <button 
            onClick={() => { setEditingTransaction(null); setIsModalOpen(true); }}
            className={`flex items-center gap-2 ${mode === 'dark' ? 'bg-slate-600 hover:bg-slate-700 shadow-slate-600/20' : 'bg-blue-800 hover:bg-blue-900 shadow-blue-800/20'} text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95`}
          >
            <Plus size={20} /> Add Transaction
          </button>
        )}
      </div>

      
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard mode={mode} title="Total Balance" amount={stats.totalBalance} type="balance" />
            <StatCard mode={mode} title="Total Income" amount={stats.totalIncome} type="income" />
            <StatCard mode={mode} title="Total Expenses" amount={stats.totalExpenses} type="expense" />
          </div>

          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BalanceTrend mode={mode} data={filteredTransactions} />
            <SpendingBreakdown mode={mode} data={filteredTransactions} />
          </div>

          
          <div className="pt-4">
            <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Smart Insights <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Beta</span>
            </h3>
            <InsightsList mode={mode} transactions={filteredTransactions} />
          </div>
        </div>
      )}

      
      {activeTab === 'transactions' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TransactionFilters 
            mode={mode}
            filterType={filterType} 
            setFilterType={setFilterType}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <TransactionTable 
            mode={mode}
            transactions={sortedTransactions} 
            role={role} 
            deleteTransaction={deleteTransaction}
            onEditTransaction={(tx) => { setEditingTransaction(tx); setIsModalOpen(true); }}
          />
        </div>
      )}

      
      {role === 'admin' && (
        <TransactionModal 
          key={editingTransaction ? `edit-${editingTransaction.id}` : 'new-transaction'}
          mode={mode}
          isOpen={isModalOpen} 
          onClose={() => { setIsModalOpen(false); setEditingTransaction(null); }} 
          onAdd={addTransaction}
          onUpdate={updateTransaction}
          editingTransaction={editingTransaction}
        />
      )}
    </Layout>
  );
}

export default App;