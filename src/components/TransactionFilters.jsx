import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { categories } from '../data/mockData';

const TransactionFilters = ({ mode, filterType, setFilterType, filterCategory, setFilterCategory, sortOrder, setSortOrder }) => {
  const handleSort = () => {
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mr-2">
        <Filter size={16} /> Filter By:
      </div>
      
      <select 
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className={`border ${mode === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-700'} text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 px-4 outline-none transition-all shadow-sm`}
      >
        <option value="all">All Types</option>
        <option value="income">Income Only</option>
        <option value="expense">Expenses Only</option>
      </select>

      <select 
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className={`border ${mode === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-700'} text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 px-4 outline-none transition-all shadow-sm`}
      >
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <button 
        onClick={handleSort}
        className="ml-auto flex items-center gap-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors"
      >
        <ArrowUpDown size={16} /> Sort by Date ({sortOrder === 'newest' ? '↓ Newest' : '↑ Oldest'})
      </button>
    </div>
  );
};

export default TransactionFilters;