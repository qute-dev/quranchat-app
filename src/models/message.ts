import { Chapter, Verse } from './qute';

export interface Message {
  method: 'nlp' | 'llm';
  id?: string;
  time?: number;
  platform?: PlatformType;
  from?: 'me' | 'bot' | string;
  source?: SourceType;
  action?: ActionType;
  text?: string;
  data?: {
    chapter?: Chapter;
    verses?: Verse[];
    translations?: Verse[];
    next?: boolean;
  };
}

export type PlatformType =
  | 'web'
  | 'android'
  | 'ios'
  | 'wa'
  | 'tele'
  | 'ig'
  | 'fb';

export type ActionType = 'search' | 'index' | 'next' | 'greeting';

export type SourceType = 'quran' | 'tafsir' | 'cache' | 'other';
