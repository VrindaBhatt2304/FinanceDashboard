import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionTable = ({ transactions, role, mode, deleteTransaction, onEditTransaction }) => {
  return (
    <div className={`${mode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} rounded-2xl shadow-sm overflow-hidden`}>
      <div className={`hidden md:grid grid-cols-4 gap-4 p-4 text-xs font-bold uppercase tracking-wider ${mode === 'dark' ? 'bg-slate-700 border-b border-slate-700 text-slate-100' : 'bg-gray-50/50 border-b border-gray-100 text-gray-400'}`}>
        <div className="pl-10">Description & Category</div>
        <div className="text-center">Date</div>
        <div className="text-right">Amount</div>
        <div className="text-right pr-4">Action</div>
      </div>

      <div className="divide-y divide-gray-100">
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <TransactionItem key={tx.id} mode={mode} transaction={tx} role={role} deleteTransaction={deleteTransaction} onEdit={() => onEditTransaction(tx)} />
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <div className="bg-gray-100 p-4 rounded-full mb-4">🏜️</div>
            <p className="font-medium">No transactions match your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;