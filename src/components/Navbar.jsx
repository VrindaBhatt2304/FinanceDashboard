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
    <header className={`h-20 backdrop-blur-md sticky top-0 z-20 px-4 md:px-8 flex items-center justify-between transition-all duration-300 ${
      mode === 'dark' 
        ? 'bg-slate-900/90 border-b border-slate-800 text-slate-100' 
        : 'bg-gradient-to-r from-[#63B8B1]/80 to-[#29579A]/70 border-b border-[#63B8B1] text-black'
    }`}>
      
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-black hover:bg-black/10 rounded-xl lg:hidden transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-2.5 text-black/60" size={18} />
          <input
            type="text"
            className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#29579A]/30 outline-none transition-all placeholder:text-black/50 ${
              mode === 'dark' 
                ? 'border-slate-700 bg-slate-800 text-slate-100' 
                : 'border-[#63B8B1] bg-white/90 text-black'
            }`}
            placeholder="Search transactions or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          className={`px-3 py-2 rounded-xl font-semibold border transition-colors ${
            mode === 'dark' 
              ? 'bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600' 
              : 'bg-gradient-to-r from-[#63B8B1]/80 to-[#29579A]/70 border-[#63B8B1] text-black hover:opacity-90'
          }`}
          aria-label="Toggle theme"
        >
          {mode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <div className={`h-8 w-px mx-1 hidden xs:block ${
          mode === 'dark' ? 'bg-slate-700' : 'bg-black/20'
        }`}></div>

        <div className={`flex items-center gap-1 p-1 rounded-2xl border shadow-inner ${
          mode === 'dark' 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white/30 border-[#63B8B1]'
        }`}>
          <button
            onClick={() => setRole('viewer')}
            className={`flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-200 ${
              role === 'viewer' 
                ? `${mode === 'dark' 
                    ? 'bg-slate-700 text-slate-100 shadow-sm' 
                    : 'bg-blue-800 text-black shadow-sm border border-[#63B8B1]'}` 
                : `${mode === 'dark' 
                    ? 'text-slate-300 hover:text-slate-100' 
                    : 'text-black/70 hover:text-black'}`
            }`}
          >
            <ShieldAlert size={14} className="text-black" /> 
            <span className="hidden xs:inline tracking-wider">VIEWER</span>
          </button>
          
          <button
            onClick={() => setRole('admin')}
            className={`flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-200 ${
              role === 'admin' 
                ? 'bg-blue-800 text-white shadow-lg shadow-blue-500/20' 
                : `${mode === 'dark' 
                    ? 'text-slate-300 hover:text-slate-100' 
                    : 'text-black/70 hover:text-black'}`
            }`}
          >
            <ShieldCheck size={14} className="text-black" /> 
            <span className="hidden xs:inline tracking-wider">ADMIN</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;