
export type Language = 'Arabic' | 'English' | 'German' | 'Japanese';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  pronunciation: string;
  example: string;
}

export interface Story {
  title: string;
  content: string;
  translation: string;
  vocabulary: { word: string; meaning: string }[];
}

export interface GrammarRule {
  title: string;
  explanation: string;
  examples: { original: string; translated: string }[];
}

export interface JourneyStep {
  day: number;
  topic: string;
  tasks: string[];
}

export type View = 'dashboard' | 'flashcards' | 'stories' | 'grammar' | 'journey' | 'tutor';
