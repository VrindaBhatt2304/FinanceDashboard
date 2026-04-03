import React from 'react';
import { Lightbulb, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const InsightsList = ({ transactions, mode }) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  
  const highestCategory = Object.keys(categoryTotals).length > 0 
    ? Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b)
    : "N/A";

  const frequency = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});
  
  const frequentCategory = Object.keys(frequency).length > 0
    ? Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b)
    : "N/A";

  const insights = [
    {
      title: "Top Spending Category",
      desc: `You spent the most on ${highestCategory} this month.`,
      icon: <ArrowUpRight className="text-rose-500" />,
      color: "bg-rose-50"
    },
    {
      title: "Frequent Habits",
      desc: `You make transactions for ${frequentCategory} most often.`,
      icon: <Lightbulb className="text-amber-500" />,
      color: "bg-amber-50"
    },
    {
      title: "Savings Potential",
      desc: "Your income was 15% higher than last week. Keep it up!",
      icon: <ArrowDownRight className="text-emerald-500" />,
      color: "bg-emerald-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {insights.map((item, index) => (
        <div key={index} className={`${mode === 'dark' ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-gray-100 hover:bg-blue-100'} p-6 rounded-2xl shadow-sm flex items-center gap-5 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:border-slate-800 hover:scale-[1.01] hover:-translate-y-1`}>
          <div className={`h-12 w-12 shrink-0 rounded-xl ${item.color} flex items-center justify-center`}>
            {item.icon}
          </div>
          <div>
            <h4 className={`font-bold text-sm ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
            <p className={`text-xs leading-relaxed mt-1 ${mode === 'dark' ? 'text-slate-100' : 'text-gray-500'}`}>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InsightsList;