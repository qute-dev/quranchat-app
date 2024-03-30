export interface Message {
  id: string;
  time: string;
  text: string;
  name: string;
  from: 'me' | 'bot';
}
