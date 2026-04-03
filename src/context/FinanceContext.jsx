import React, { createContext, useState, useContext } from 'react';
import { initialTransactions } from '../data/mockData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState('admin');
  const [searchQuery, setSearchQuery] = useState('');

  const totalBalance = transactions.reduce((acc, item) => 
    item.type === 'income' ? acc + item.amount : acc - item.amount, 0);

  const addTransaction = (newTx) => {
    if (role === 'admin') {
      setTransactions([...transactions, { ...newTx, id: Date.now() }]);
    }
  };

  return (
    <FinanceContext.Provider value={{ 
      transactions, role, setRole, totalBalance, searchQuery, setSearchQuery, addTransaction 
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};