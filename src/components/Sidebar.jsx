import React from 'react';
import { LayoutDashboard, ReceiptText, X, DollarSign } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen, mode }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
  ];

  const isDark = mode === 'dark';

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 backdrop-blur-sm z-30 lg:hidden ${
            isDark ? 'bg-slate-900/60' : 'bg-black/30'
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-64 flex flex-col border-r z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${
          isDark
            ? 'bg-slate-900 text-slate-300 border-slate-800'
            : 'bg-gradient-to-b from-[#63B8B1]/80 to-[#29579A]/70 text-black border-[#63B8B1]'
        }`}
      >
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-blue-900 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <DollarSign size={24} color="white" />
            </div>

            <span className={`font-bold text-xl ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              FinanceUI
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className={`lg:hidden ${
              isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-black/70 hover:text-black'
            }`}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? isDark
                    ? 'bg-slate-700 text-white'
                    : 'bg-white/70 text-black border border-[#63B8B1]'
                  : isDark
                  ? 'hover:bg-slate-800 hover:text-white'
                  : 'hover:bg-white/30 hover:text-black'
              }`}
            >
              <item.icon size={20} />
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={`p-8 border-t text-[10px] uppercase font-bold ${
          isDark
            ? 'border-slate-800 text-slate-500'
            : 'border-[#63B8B1] text-black/60'
        }`}>
          finance dashboard &copy; 2026
        </div>
      </aside>
    </>
  );
};

export default Sidebar;