import React, { useState } from 'react';
import { X } from 'lucide-react';
import { categories } from '../data/mockData';

const TransactionModal = ({ mode, isOpen, onClose, onAdd, onUpdate, editingTransaction }) => {
  const initialFormData = () => ({
    description: editingTransaction?.description || '',
    amount: editingTransaction?.amount || '',
    category: editingTransaction?.category || 'Groceries',
    type: editingTransaction?.type || 'expense',
    date: editingTransaction?.date || new Date().toISOString().split('T')[0],
    id: editingTransaction?.id
  });

  const [formData, setFormData] = useState(initialFormData);


  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: formData.date || new Date().toISOString().split('T')[0],
    };

    if (formData.id) {
      onUpdate(payload);
    } else {
      onAdd(payload);
    }

    setFormData({
      description: '',
      amount: '',
      category: 'Groceries',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      id: undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`${mode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200`}>
        <div className={`p-6 border-b flex justify-between items-center ${mode === 'dark' ? 'border-slate-700 bg-slate-800 text-white' : 'border-gray-100 bg-gray-50/50 text-gray-900'}`}>
          <h3 className="text-xl font-bold">{formData.id ? 'Edit Transaction' : 'New Transaction'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-bold mb-1 ${mode === 'dark' ? 'text-slate-100' : 'text-gray-700'}`}>Description</label>
            <input
              required
              type="text"
              value={formData.description}
              className={`w-full border rounded-xl p-3 outline-none focus:border-blue-500 ${mode === 'dark' ? 'border-slate-700 bg-slate-700 text-white' : 'border-gray-200 bg-white text-gray-900'}`}
              placeholder="e.g. Weekly Groceries"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-bold mb-1 ${mode === 'dark' ? 'text-slate-100' : 'text-gray-700'}`}>Amount ($)</label>
              <input
                required
                type="number"
                step="0.01"
                value={formData.amount}
                className={`w-full border rounded-xl p-3 outline-none focus:border-blue-500 ${mode === 'dark' ? 'border-slate-700 bg-slate-700 text-white' : 'border-gray-200 bg-white text-gray-900'}`}
                placeholder="0.00"
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div>
              <label className={`block text-sm font-bold mb-1 ${mode === 'dark' ? 'text-slate-100' : 'text-gray-700'}`}>Type</label>
              <select
                value={formData.type}
                className={`w-full border rounded-xl p-3 outline-none focus:border-blue-500 ${mode === 'dark' ? 'border-slate-700 bg-slate-700 text-white' : 'border-gray-200 bg-white text-gray-900'}`}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-bold mb-1 ${mode === 'dark' ? 'text-slate-100' : 'text-gray-700'}`}>Category</label>
            <select
              value={formData.category}
              className={`w-full border rounded-xl p-3 outline-none focus:border-blue-500 ${mode === 'dark' ? 'border-slate-700 bg-slate-700 text-white' : 'border-gray-200 bg-white text-gray-900'}`}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-bold mb-1 ${mode === 'dark' ? 'text-slate-100' : 'text-gray-700'}`}>Date</label>
            <input
              required
              type="date"
              value={formData.date}
              className={`w-full border rounded-xl p-3 outline-none focus:border-blue-500 ${mode === 'dark' ? 'border-slate-700 bg-slate-700 text-white' : 'border-gray-200 bg-white text-gray-900'}`}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <button type="submit" className={`w-full ${mode === 'dark' ? 'bg-slate-600 hover:bg-slate-700 shadow-slate-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'} text-white font-bold py-4 rounded-xl transition-colors shadow-lg mt-4`}>
            {formData.id ? 'Update Transaction' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;