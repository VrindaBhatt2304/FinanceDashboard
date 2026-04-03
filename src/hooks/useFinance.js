import { useState, useMemo, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';

export const useFinance = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [role, setRole] = useState('viewer');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            t.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
      
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, searchQuery, filterType, filterCategory]);

  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      totalBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses,
    };
  }, [transactions]);

  const addTransaction = (newTx) => {
    if (role === 'admin') {
      setTransactions([{ ...newTx, id: Date.now() }, ...transactions]);
    } else {
      console.warn("Permission Denied: Viewer cannot add transactions.");
    }
  };

  const deleteTransaction = (id) => {
    if (role === 'admin') {
      setTransactions(transactions.filter((t) => t.id !== id));
    } else {
      console.warn("Permission Denied: Viewer cannot delete transactions.");
    }
  };

  const updateTransaction = (updatedTx) => {
    if (role === 'admin') {
      setTransactions(transactions.map((t) => (t.id === updatedTx.id ? { ...t, ...updatedTx } : t)));
    } else {
      console.warn("Permission Denied: Viewer cannot edit transactions.");
    }
  };

  return {
    transactions,
    filteredTransactions,
    stats,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    role,
    setRole,
    addTransaction,
    deleteTransaction,
    updateTransaction
  };
};