export interface Message {
  id: string;
  date: string;
  text: string;
  from: 'user' | 'bot';
}
