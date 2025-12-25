
import React, { useState, useEffect } from 'react';
import { Language, Story } from '../types.ts';
import { generateStory } from '../services/gemini.ts';

interface StoriesViewProps {
  language: Language;
}

const StoriesView: React.FC<StoriesViewProps> = ({ language }) => {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState('A nice day at the park');

  useEffect(() => {
    fetchStory();
  }, [language]);

  const fetchStory = async () => {
    setLoading(true);
    try {
      const data = await generateStory(language, topic);
      setStory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 lg:py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-800">قصص قصيرة بالـ {language}</h2>
          <p className="text-sm text-slate-500">طور مهارات القراءة من خلال قصص ممتعة ومبسطة</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <input 
            type="text" 
            placeholder="اختر موضوع القصة..."
            className="flex-1 md:w-48 px-4 py-2 text-sm border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button 
            onClick={fetchStory}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-transform"
          >
            توليد
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl p-8 lg:p-12 text-center shadow-sm">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-slate-200 rounded w-1/3 mx-auto"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
          </div>
          <p className="mt-8 text-slate-500 text-sm">جاري تأليف قصة شيقة لك...</p>
        </div>
      ) : story && (
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-slate-100">
            <h3 className="text-2xl lg:text-3xl font-bold text-indigo-600 mb-6 text-center">{story.title}</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b pb-1">النص الأصلي</span>
                <p className="text-lg lg:text-xl leading-relaxed text-slate-800 font-medium" style={{ direction: language === 'Arabic' ? 'rtl' : 'ltr' }}>
                  {story.content}
                </p>
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b pb-1">الترجمة للعربية</span>
                <p className="text-lg lg:text-xl leading-relaxed text-slate-600">
                  {story.translation}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-[2rem] p-6 lg:p-8 border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
              <span className="text-xl">💡</span> أهم المفردات:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {story.vocabulary.map((v, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
                  <div className="font-bold text-indigo-600 text-base">{v.word}</div>
                  <div className="text-slate-500 text-xs">{v.meaning}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesView;
