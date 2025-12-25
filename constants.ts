
import { Language } from './types.ts';

export const LANGUAGES: { id: Language; name: string; icon: string; nativeName: string }[] = [
  { id: 'Arabic', name: 'العربية', nativeName: 'العربية', icon: '🇸🇦' },
  { id: 'English', name: 'الإنجليزية', nativeName: 'English', icon: '🇺🇸' },
  { id: 'German', name: 'الألمانية', nativeName: 'Deutsch', icon: '🇩🇪' },
  { id: 'Japanese', name: 'اليابانية', nativeName: '日本語', icon: '🇯🇵' }
];

export const APP_THEME = {
  primary: '#6366f1',
  secondary: '#10b981',
  accent: '#f59e0b',
  background: '#f8fafc',
  text: '#1e293b'
};
