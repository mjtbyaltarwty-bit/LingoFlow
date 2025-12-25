
import { GoogleGenAI, Type } from "@google/genai";
import { Flashcard, Story, GrammarRule, JourneyStep, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFlashcards = async (targetLang: Language, level: string): Promise<Flashcard[]> => {
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
            front: { type: Type.STRING, description: "The word in the target language" },
            back: { type: Type.STRING, description: "The translation in Arabic" },
            pronunciation: { type: Type.STRING, description: "Phonetic pronunciation" },
            example: { type: Type.STRING, description: "A simple example sentence" }
          },
          required: ["id", "front", "back", "pronunciation", "example"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateStory = async (targetLang: Language, topic: string): Promise<Story> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a very short story (5-7 sentences) in ${targetLang} about ${topic}. Include Arabic translation and 3 key vocabulary words. Output as JSON.`,
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
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Explain a simple grammar rule in ${targetLang} related to ${topic}. Output as JSON. Explain in Arabic.`,
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
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a 7-day language learning journey plan for ${targetLang} aiming for ${goal}. Output as JSON. Translate tasks to Arabic.`,
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
