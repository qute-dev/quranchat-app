const isDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

export const API_URL = isDev
  ? 'http://127.0.0.1:7777'
  : 'https://api.qute.my';
