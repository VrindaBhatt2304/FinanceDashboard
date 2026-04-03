import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const BalanceTrend = ({ data, mode }) => {
  const chartData = [...data]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(t => ({ date: t.date, amount: t.amount }));

  const chartContainerClasses = mode === 'dark'
    ? 'bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-700 h-[400px] transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:bg-slate-700 hover:border-slate-600 hover:scale-[1.01] hover:-translate-y-1'
    : `
      bg-gradient-to-r from-[#63B8B1]/10 to-[#29579A]/10
      p-6
      rounded-2xl
      shadow-sm
      border border-[#63B8B1]
      h-[400px]
      transition-all duration-300 ease-in-out
      cursor-pointer
      hover:shadow-xl
      hover:bg-gradient-to-r hover:from-[#63B8B1]/20 hover:to-[#29579A]/20
      hover:border-[#29579A]
      hover:scale-[1.01]
      hover:-translate-y-1
    `;

  return (
    <div className={chartContainerClasses}>
      <h3 className={`text-lg font-bold mb-6 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Balance Trend (Time-Based)
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="date" fontSize={10} tickMargin={10} stroke="#94a3b8" />
          <YAxis fontSize={10} stroke="#94a3b8" />

          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
          />

          <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SpendingBreakdown = ({ data, mode }) => {
  const grouped = data
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const chartData = Object.keys(grouped).map(key => ({ name: key, value: grouped[key] }));

  const chartContainerClasses = mode === 'dark'
    ? 'bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-700 h-[400px] transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:bg-slate-700 hover:border-slate-600 hover:scale-[1.01] hover:-translate-y-1'
    : `
      bg-gradient-to-r from-[#63B8B1]/10 to-[#29579A]/10
      p-6
      rounded-2xl
      shadow-sm
      border border-[#63B8B1]
      h-[400px]
      transition-all duration-300 ease-in-out
      cursor-pointer
      hover:shadow-xl
      hover:bg-gradient-to-r hover:from-[#63B8B1]/20 hover:to-[#29579A]/20
      hover:border-[#29579A]
      hover:scale-[1.01]
      hover:-translate-y-1
    `;

  return (
    <div className={chartContainerClasses}>
      <h3 className={`text-lg font-bold mb-6 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Spending Breakdown (Categorical)
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};