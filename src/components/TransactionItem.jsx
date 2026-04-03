import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Trash2, Edit3 } from 'lucide-react';

const TransactionItem = ({ transaction, role, mode, deleteTransaction, onEdit }) => {
  const isIncome = transaction.type === 'income';

  return (
    <div
      className={`group grid grid-cols-1 md:grid-cols-4 gap-4 p-4 items-center transition-all border-b ${
        mode === 'dark'
          ? 'border-slate-700 bg-slate-800 hover:bg-slate-700'
          : `
            border-[#63B8B1]
            bg-gradient-to-r from-[#63B8B1]/15 to-[#29579A]/15
            hover:bg-gradient-to-r hover:from-[#63B8B1]/25 hover:to-[#29579A]/25
          `
      } last:border-0`}
    >
      
      <div className="flex items-center gap-4">
        <div
          className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
            isIncome
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-rose-100 text-rose-600'
          }`}
        >
          {isIncome ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
        </div>

        <div className="overflow-hidden">
          <p className={`font-bold truncate ${mode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {transaction.description}
          </p>
          <p className={`text-xs font-medium uppercase tracking-wider ${mode === 'dark' ? 'text-slate-300' : 'text-slate-500'}`}>
            {transaction.category}
          </p>
        </div>
      </div>

      <div className={`text-sm md:text-center font-medium ${mode === 'dark' ? 'text-slate-200' : 'text-slate-500'}`}>
        {transaction.date}
      </div>

      <div
        className={`text-right font-bold text-lg ${
          isIncome
            ? 'text-emerald-400'
            : mode === 'dark'
            ? 'text-slate-100'
            : 'text-slate-900'
        }`}
      >
        {isIncome ? '+' : '-'}${transaction.amount.toLocaleString()}
      </div>

      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {role === 'admin' ? (
          <>
            <button
              className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
              title="Edit"
              onClick={onEdit}
            >
              <Edit3 size={16} />
            </button>
            <button
              className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
              title="Delete"
              onClick={() => deleteTransaction(transaction.id)}
            >
              <Trash2 size={16} />
            </button>
          </>
        ) : (
          <span className="text-[10px] text-black italic">View Only</span>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;