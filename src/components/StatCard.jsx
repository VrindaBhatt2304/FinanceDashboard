import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const StatCard = ({ title, amount, type, mode }) => {
  const isIncome = type === 'income';
  const isBalance = type === 'balance';

  return (
    <div
      className={`${
        mode === 'dark'
          ? 'bg-slate-800 border-slate-700 hover:bg-slate-700'
          : `
            bg-gradient-to-r from-[#63B8B1]/30 to-[#29579A]/30
            border border-[#63B8B1]
            hover:bg-gradient-to-r hover:from-[#63B8B1]/40 hover:to-[#29579A]/40
            hover:border-[#29579A]
          `
      } p-6 rounded-2xl shadow-sm flex items-center gap-5 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01] hover:-translate-y-1`}
    >
      <div
        className={`p-4 rounded-xl ${
          isIncome
            ? "bg-emerald-50 text-emerald-600"
            : isBalance
            ? "bg-blue-50 text-blue-600"
            : "bg-rose-50 text-rose-600"
        }`}
      >
        {isIncome ? (
          <TrendingUp size={24} />
        ) : isBalance ? (
          <Wallet size={24} />
        ) : (
          <TrendingDown size={24} />
        )}
      </div>

      <div>
        <p
          className={`text-sm font-medium mb-1 ${
            mode === 'dark' ? 'text-slate-100' : 'text-gray-500'
          }`}
        >
          {title}
        </p>

        <h3
          className={`text-2xl font-bold ${
            mode === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          ${amount.toLocaleString()}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;