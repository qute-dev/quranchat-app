const isLocal =
  window?.location?.href?.includes('localhost') ||
  window?.location?.href?.includes('127.0.0.1');

export const API_URL = isLocal
  ? 'http://127.0.0.1:7777'
  : 'https://nlp.quranchat.me';
