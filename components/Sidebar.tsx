
import React from 'react';
import { View } from '../types.ts';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, onClose }) => {
  const menuItems: { id: View; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'الرئيسية', icon: '🏠' },
    { id: 'flashcards', label: 'البطاقات التعليمية', icon: '🎴' },
    { id: 'stories', label: 'قصص قصيرة', icon: '📖' },
    { id: 'grammar', label: 'قواعد بسيطة', icon: '⚖️' },
    { id: 'journey', label: 'خطة التعلم', icon: '🗺️' },
    { id: 'tutor', label: 'المعلم الذكي', icon: '🤖' },
  ];

  const handleNavClick = (view: View) => {
    setView(view);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside className={`
        fixed top-0 right-0 h-screen bg-white border-l border-slate-200 flex flex-col z-50 transition-transform duration-300 ease-in-out
        w-64 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-indigo-600 flex items-center gap-2">
            <span className="bg-indigo-600 text-white p-1 rounded-lg">LF</span>
            LingoFlow
          </h1>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
            ✕
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-indigo-50 text-indigo-600 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-indigo-600 rounded-2xl p-4 text-white text-sm shadow-lg shadow-indigo-200">
            <p className="opacity-80">ترقية الحساب؟</p>
            <p className="font-bold">احصل على وصول كامل</p>
            <button className="mt-2 w-full bg-white text-indigo-600 py-2 rounded-lg font-bold hover:bg-slate-50 transition-colors">تعلم المزيد</button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
