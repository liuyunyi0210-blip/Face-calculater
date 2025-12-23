
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-900 tracking-tight">AI 智能人數統計系統</h1>
            <p className="text-xs text-slate-500 font-medium">自動判斷部別 · 支援人工修正</p>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
            核心引擎: Gemini 3 Flash
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
