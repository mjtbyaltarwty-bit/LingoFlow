
import React from 'react';
import { Language } from '../types';

interface LanguageCardProps {
  language: { id: Language; name: string; nativeName: string; icon: string };
  isSelected: boolean;
  onSelect: (lang: Language) => void;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(language.id)}
      className={`p-4 lg:p-6 rounded-2xl lg:rounded-3xl transition-all duration-300 flex flex-col items-center gap-2 lg:gap-3 border-2 ${
        isSelected
          ? 'bg-white border-indigo-500 shadow-xl shadow-indigo-100 scale-[1.02] lg:scale-105'
          : 'bg-white border-transparent hover:border-slate-200 hover:shadow-lg'
      }`}
    >
      <span className="text-3xl lg:text-5xl">{language.icon}</span>
      <div className="text-center">
        <div className="font-bold text-slate-800 text-sm lg:text-lg whitespace-nowrap">{language.name}</div>
        <div className="text-slate-400 text-[10px] lg:text-sm font-medium">{language.nativeName}</div>
      </div>
    </button>
  );
};

export default LanguageCard;
