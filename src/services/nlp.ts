import axios from 'axios';
import { API_URL } from './config';
import { Message } from 'src/models';

export async function getReply(text: string, user: string) {
  const url = `${API_URL}/query`;

  // console.log('[SERVICE:NLP] getReply', { url, text });

  const msg = {
    platform: 'web',
    user,
    text,
  };

  const resp = await axios.post(url, msg);

  // console.log('[SERVICE:NLP] getReply:resp', resp);

  return resp.data as Message;
}
