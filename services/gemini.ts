
import { GoogleGenAI, Type } from "@google/genai";
import { Flashcard, Story, GrammarRule, JourneyStep, Language } from "../types.ts";

// دالة مساعدة للحصول على المفتاح بشكل آمن من عدة مصادر محتملة
const getApiKey = (): string => {
  if (typeof process !== 'undefined' && process.env?.API_KEY) return process.env.API_KEY;
  if ((window as any).process?.env?.API_KEY) return (window as any).process.env.API_KEY;
  return "";
};

const getAI = () => {
  return new GoogleGenAI({ apiKey: getApiKey() });
};

export const generateFlashcards = async (targetLang: Language, level: string): Promise<Flashcard[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate 5 flashcards for learning ${targetLang} at ${level} level. Output as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            front: { type: Type.STRING },
            back: { type: Type.STRING },
            pronunciation: { type: Type.STRING },
            example: { type: Type.STRING }
          },
          required: ["id", "front", "back", "pronunciation", "example"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateStory = async (targetLang: Language, topic: string): Promise<Story> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a very short story in ${targetLang} about ${topic}. Include Arabic translation. Output as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING },
          translation: { type: Type.STRING },
          vocabulary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                word: { type: Type.STRING },
                meaning: { type: Type.STRING }
              }
            }
          }
        },
        required: ["title", "content", "translation", "vocabulary"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateGrammar = async (targetLang: Language, topic: string): Promise<GrammarRule> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Explain ${topic} grammar in ${targetLang} for Arabic speaker. Output as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          explanation: { type: Type.STRING },
          examples: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                translated: { type: Type.STRING }
              }
            }
          }
        },
        required: ["title", "explanation", "examples"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateJourney = async (targetLang: Language, goal: string): Promise<JourneyStep[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a 7-day learning plan for ${targetLang} to achieve: ${goal}. Output as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.NUMBER },
            topic: { type: Type.STRING },
            tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["day", "topic", "tasks"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};
