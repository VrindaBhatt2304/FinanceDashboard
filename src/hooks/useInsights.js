import { useMemo } from 'react';

export const useInsights = (transactions) => {
  return useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    
    const topCategory = Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b)
      : "None";

    const avgSpend = expenses.length > 0 
      ? (expenses.reduce((acc, t) => acc + t.amount, 0) / expenses.length).toFixed(2)
      : 0;

    const largestExpense = expenses.length > 0
      ? Math.max(...expenses.map(t => t.amount))
      : 0;

    return {
      topCategory,
      avgSpend,
      largestExpense,
      totalTransactions: transactions.length
    };
  }, [transactions]);
};