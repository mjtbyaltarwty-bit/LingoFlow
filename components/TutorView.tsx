
import React, { useState } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Language } from '../types';

interface TutorViewProps {
  language: Language;
}

const TutorView: React.FC<TutorViewProps> = ({ language }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: `مرحباً بك! أنا معلمك الذكي للغة ${language}. كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن الترجمة، القواعد، أو حتى ممارسة المحادثة.` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: `Act as a helpful and encouraging language tutor for ${language}. Current context: Helping an Arabic speaker. User said: ${userMsg}` }] }
        ],
        config: {
          systemInstruction: `You are a professional language teacher specializing in teaching ${language} to Arabic speakers. Be encouraging, clear, and provide translations when necessary.`
        }
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || 'عذراً، حدث خطأ ما.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: 'عذراً، واجهت مشكلة في الاتصال.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col">
      <div className="bg-white rounded-t-3xl p-6 border-b border-slate-100 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl">🤖</div>
        <div>
          <h2 className="font-bold text-slate-800 text-lg">المعلم الذكي - {language}</h2>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span className="text-xs text-slate-400 font-medium">متصل ومستعد للمساعدة</span>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
            }`}>
              <p className="whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-end">
            <div className="bg-white p-4 rounded-2xl shadow-sm flex gap-2">
              <span className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 border-t border-slate-100 rounded-b-3xl">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="اكتب سؤالك هنا..."
            className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-300 rounded-xl px-4 py-3 outline-none transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            onClick={sendMessage}
            disabled={loading}
            className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorView;
