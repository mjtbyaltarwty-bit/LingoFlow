
import React, { useState, useEffect } from 'react';
import { Language, Flashcard } from '../types.ts';
import { generateFlashcards } from '../services/gemini.ts';

interface FlashcardViewProps {
  language: Language;
}

const FlashcardView: React.FC<FlashcardViewProps> = ({ language }) => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCards();
  }, [language]);

  const loadCards = async () => {
    setLoading(true);
    try {
      const newCards = await generateFlashcards(language, 'Beginner');
      setCards(newCards);
      setCurrentIndex(0);
      setIsFlipped(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium">جاري تجهيز بطاقاتك التعليمية الذكية...</p>
    </div>
  );

  const card = cards[currentIndex];

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">البطاقات التعليمية - {language}</h2>
        <button 
          onClick={loadCards}
          className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-100"
        >
          تحديث البطاقات 🔄
        </button>
      </div>

      <div 
        className="perspective-1000 relative w-full h-80 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 bg-white shadow-2xl rounded-3xl p-8 flex flex-col items-center justify-center backface-hidden border border-slate-100">
            <span className="text-indigo-600 text-sm font-bold mb-4 uppercase tracking-widest">المصطلح</span>
            <h3 className="text-5xl font-extrabold text-slate-800 mb-2">{card.front}</h3>
            <p className="text-slate-400 font-medium">{card.pronunciation}</p>
          </div>
          {/* Back */}
          <div className="absolute inset-0 bg-indigo-600 shadow-2xl rounded-3xl p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180 text-white">
            <span className="text-indigo-200 text-sm font-bold mb-4 uppercase tracking-widest">الترجمة</span>
            <h3 className="text-4xl font-bold mb-6 text-center">{card.back}</h3>
            <div className="bg-white/10 p-4 rounded-xl w-full">
              <p className="text-indigo-100 text-sm mb-1 italic">مثال:</p>
              <p className="text-lg leading-relaxed">{card.example}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center items-center gap-8">
        <button 
          onClick={nextCard}
          className="bg-white border-2 border-slate-200 text-slate-700 px-10 py-4 rounded-2xl font-bold hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center gap-2"
        >
          البطاقة التالية
          <span className="text-xl">👉</span>
        </button>
      </div>

      <div className="mt-8 text-center text-slate-400 text-sm">
        اضغط على البطاقة لقلبها
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default FlashcardView;
