
import React, { useState, useEffect } from 'react';
import { Language, GrammarRule } from '../types.ts';
import { generateGrammar } from '../services/gemini.ts';

interface GrammarViewProps {
  language: Language;
}

const GrammarView: React.FC<GrammarViewProps> = ({ language }) => {
  const [rule, setRule] = useState<GrammarRule | null>(null);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState('Present Tense');

  useEffect(() => {
    fetchGrammar();
  }, [language]);

  const fetchGrammar = async () => {
    setLoading(true);
    try {
      const data = await generateGrammar(language, topic);
      setRule(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">أساسيات القواعد - {language}</h2>
        <div className="flex gap-2">
          <select 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="px-4 py-2 border rounded-xl bg-white"
          >
            <option value="Present Tense">المضارع</option>
            <option value="Past Tense">الماضي</option>
            <option value="Sentence Structure">تركيب الجملة</option>
            <option value="Pronouns">الضمائر</option>
            <option value="Adjectives">الصفات</option>
          </select>
          <button 
            onClick={fetchGrammar}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold"
          >
            بحث
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">جاري شرح القاعدة...</div>
      ) : rule && (
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">{rule.title}</h3>
          <p className="text-slate-700 text-lg leading-relaxed mb-10 whitespace-pre-wrap">{rule.explanation}</p>
          
          <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-600 p-1 rounded">📝</span> أمثلة تطبيقية:
          </h4>
          <div className="space-y-4">
            {rule.examples.map((ex, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="text-xl font-bold text-indigo-600" style={{ direction: language === 'Arabic' ? 'rtl' : 'ltr' }}>{ex.original}</div>
                <div className="text-slate-500 font-medium italic border-r-2 border-slate-200 pr-4">{ex.translated}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GrammarView;
