
import React, { useState } from 'react';
import { View, Language } from './types.ts';
import { LANGUAGES } from './constants.ts';
import Sidebar from './components/Sidebar.tsx';
import LanguageCard from './components/LanguageCard.tsx';
import FlashcardView from './components/FlashcardView.tsx';
import StoriesView from './components/StoriesView.tsx';
import GrammarView from './components/GrammarView.tsx';
import JourneyView from './components/JourneyView.tsx';
import TutorView from './components/TutorView.tsx';

const App: React.FC = () => {
  const [currentView, setView] = useState<View>('dashboard');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-8 lg:space-y-12 animate-fadeIn">
            <header className="text-center space-y-4 pt-4 lg:pt-10">
              <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight px-4">
                ماذا تريد أن تتعلم <span className="text-indigo-600 underline decoration-indigo-200 decoration-4 lg:decoration-8 underline-offset-4">اليوم؟</span>
              </h1>
              <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-medium px-6">
                اختر اللغة التي تود إتقانها وابدأ رحلتك التعليمية المدعومة بالذكاء الاصطناعي
              </p>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 px-2">
              {LANGUAGES.map((lang) => (
                <LanguageCard
                  key={lang.id}
                  language={lang}
                  isSelected={selectedLanguage === lang.id}
                  onSelect={setSelectedLanguage}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 px-2">
              <div className="bg-white p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="bg-indigo-50 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center text-2xl lg:text-3xl mb-6">🎯</div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-3">أين توقفت؟</h3>
                <p className="text-slate-500 mb-6 font-medium text-sm lg:text-base">أكمل من حيث انتهيت في المرة السابقة وتابع تقدمك.</p>
                <div className="h-2 bg-slate-100 rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[65%] rounded-full"></div>
                </div>
                <button className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm lg:text-base">
                  استكمال التعلم <span>←</span>
                </button>
              </div>

              <div className="bg-indigo-600 p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
                <div className="absolute top-[-20px] left-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                <div className="bg-white/20 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center text-2xl lg:text-3xl mb-6">💡</div>
                <h3 className="text-xl lg:text-2xl font-bold mb-3">تلميحة ذكية</h3>
                <p className="text-indigo-100 mb-6 font-medium text-sm lg:text-base">تخصيص 15 دقيقة يومياً أفضل من ساعتين مرة واحدة في الأسبوع.</p>
                <button 
                  onClick={() => setView('tutor')}
                  className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold hover:bg-indigo-50 transition-colors text-sm lg:text-base"
                >
                  استشر المعلم الذكي
                </button>
              </div>
            </div>
          </div>
        );
      case 'flashcards':
        return <FlashcardView language={selectedLanguage} />;
      case 'stories':
        return <StoriesView language={selectedLanguage} />;
      case 'grammar':
        return <GrammarView language={selectedLanguage} />;
      case 'journey':
        return <JourneyView language={selectedLanguage} />;
      case 'tutor':
        return <TutorView language={selectedLanguage} />;
      default:
        return <div>قيد التطوير...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex overflow-x-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={setView} 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <main className="flex-1 lg:mr-64 w-full min-h-screen transition-all duration-300">
        <div className="max-w-6xl mx-auto p-4 lg:p-8">
          {/* Header Bar */}
          <div className="flex justify-between items-center mb-6 lg:mb-10">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="flex items-center gap-2 lg:gap-3 bg-white px-3 lg:px-4 py-2 rounded-xl lg:rounded-2xl shadow-sm border border-slate-100">
                <span className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">اللغة الحالية:</span>
                <span className="text-lg lg:text-xl">{LANGUAGES.find(l => l.id === selectedLanguage)?.icon}</span>
                <span className="font-bold text-slate-700 text-sm lg:text-base">{LANGUAGES.find(l => l.id === selectedLanguage)?.name}</span>
              </div>
            </div>
            
            <div className="flex gap-2 lg:gap-4 items-center">
              <div className="bg-white h-10 w-10 lg:h-12 lg:w-12 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-lg lg:text-xl cursor-pointer hover:bg-slate-50">🔔</div>
              <div className="flex items-center gap-2 lg:gap-3 bg-white p-1 pr-2 lg:pr-4 rounded-xl lg:rounded-2xl shadow-sm border border-slate-100">
                <div className="text-right hidden md:block">
                  <div className="text-sm font-bold text-slate-800">أحمد محمد</div>
                  <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">متعلم متقدم</div>
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-indigo-100 rounded-lg lg:rounded-xl overflow-hidden">
                  <img src="https://picsum.photos/100/100" alt="avatar" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          <div className="pb-20 lg:pb-0">
            {renderContent()}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
