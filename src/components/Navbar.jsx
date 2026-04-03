import React from 'react';
import { 
  Search, 
  Menu, 
  ShieldCheck, 
  ShieldAlert,
  Sun,
  Moon
} from 'lucide-react';

const Navbar = ({ 
  searchQuery, 
  setSearchQuery, 
  setIsOpen, 
  role, 
  setRole,
  mode,
  setMode
}) => {
  return (
    <header className={`h-20 backdrop-blur-md sticky top-0 z-20 px-4 md:px-8 flex items-center justify-between transition-all duration-300 ${mode === 'dark' ? 'bg-slate-900/90 border-b border-slate-800 text-slate-100' : 'bg-white/80 border-b border-slate-200 text-slate-900'}`}>
      
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl lg:hidden transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input
            type="text"
            className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 ${mode === 'dark' ? 'border-slate-700 bg-slate-800 text-slate-100' : 'border-slate-200 bg-slate-50/50 text-slate-900'}`}
            placeholder="Search transactions or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          className={`px-3 py-2 rounded-xl font-semibold border transition-colors ${mode === 'dark' ? 'bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-100'}`}
          aria-label="Toggle theme"
        >
          {mode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <div className={`h-8 w-px mx-1 hidden xs:block ${mode === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}></div>

        <div className={`flex items-center gap-1 p-1 rounded-2xl border shadow-inner ${mode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
          <button
            onClick={() => setRole('viewer')}
            className={`flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-200 ${
              role === 'viewer' 
                ? `${mode === 'dark' ? 'bg-slate-700 text-slate-100 shadow-sm' : 'bg-white text-slate-900 shadow-sm'}`
                : `${mode === 'dark' ? 'text-slate-300 hover:text-slate-100' : 'text-slate-500 hover:text-slate-700'}`
            }`}
          >
            <ShieldAlert size={14} className={role === 'viewer' ? 'text-amber-500' : ''} /> 
            <span className="hidden xs:inline tracking-wider">VIEWER</span>
          </button>
          
          <button
            onClick={() => setRole('admin')}
            className={`flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-200 ${
              role === 'admin' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : `${mode === 'dark' ? 'text-slate-300 hover:text-slate-100' : 'text-slate-500 hover:text-slate-700'}`
            }`}
          >
            <ShieldCheck size={14} /> 
            <span className="hidden xs:inline tracking-wider">ADMIN</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;