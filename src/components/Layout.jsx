import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  role, 
  setRole, 
  mode,
  setMode,
  searchQuery, 
  setSearchQuery,
  isOpen,
  setIsOpen
}) => {
  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      mode === 'dark' 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-white text-slate-900'
    }`}>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        role={role} 
        setRole={setRole}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mode={mode}
      />

      <div className="flex flex-col min-h-screen lg:ml-64">
        
        <Navbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          setIsOpen={setIsOpen}
          role={role}
          setRole={setRole}
          mode={mode}
          setMode={setMode}
        />
        
        <main className="p-4 md:p-8 flex-1 w-full max-w-7xl mx-auto">
          <div className="animate-in fade-in duration-700">
            {children}
          </div>
        </main>

        <footer className="p-4 md:p-8 border-t border-slate-200/60 text-center">
          <p className="text-slate-400 text-xs font-medium tracking-wide">
            FINANCE DASHBOARD UI 2026 
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;