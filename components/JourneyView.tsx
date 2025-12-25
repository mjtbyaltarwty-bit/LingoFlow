
import React, { useState, useEffect } from 'react';
import { Language, JourneyStep } from '../types';
import { generateJourney } from '../services/gemini';

interface JourneyViewProps {
  language: Language;
}

const JourneyView: React.FC<JourneyViewProps> = ({ language }) => {
  const [steps, setSteps] = useState<JourneyStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [goal, setGoal] = useState('Conversational skills');

  useEffect(() => {
    fetchJourney();
  }, [language]);

  const fetchJourney = async () => {
    setLoading(true);
    try {
      const data = await generateJourney(language, goal);
      setSteps(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-indigo-600 rounded-3xl p-8 text-white mb-12 shadow-xl shadow-indigo-100">
        <h2 className="text-3xl font-bold mb-2">خطة رحلتك التعليمية</h2>
        <p className="opacity-80 mb-6">خطة مخصصة ذكياً لتصل لهدفك في {language}</p>
        
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold mb-2 opacity-80">ما هو هدفك؟</label>
            <input 
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:bg-white/30 text-white placeholder-white/50"
              placeholder="مثلاً: التحدث بطلاقة، التحضير للسفر..."
            />
          </div>
          <button 
            onClick={fetchJourney}
            className="bg-white text-indigo-600 px-8 py-2 rounded-xl font-extrabold hover:bg-indigo-50 transition-colors"
          >
            تحديث الخطة
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white h-24 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-0 bottom-0 right-8 w-1 bg-slate-200 hidden md:block"></div>
          
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.day} className="relative flex flex-col md:flex-row gap-6 md:pr-16">
                <div className="absolute right-6 top-0 w-5 h-5 bg-indigo-500 rounded-full border-4 border-white hidden md:block z-10"></div>
                
                <div className="flex-none bg-white shadow-sm border border-slate-100 rounded-2xl p-4 text-center w-24 h-24 flex flex-col justify-center shrink-0">
                  <span className="text-xs text-slate-400 font-bold">اليوم</span>
                  <span className="text-3xl font-black text-indigo-600">{step.day}</span>
                </div>

                <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{step.topic}</h3>
                  <ul className="space-y-3">
                    {step.tasks.map((task, ti) => (
                      <li key={ti} className="flex items-start gap-3 text-slate-600">
                        <span className="bg-emerald-100 text-emerald-600 p-0.5 rounded-full text-xs mt-1">✓</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JourneyView;
