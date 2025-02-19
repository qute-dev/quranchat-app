const isLocal =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1';

const isDev = location.hostname === '154.26.130.96';

export const API_URL = isLocal
  ? 'http://127.0.0.1:7777'
  : isDev
  ? 'http://154.26.130.96:7002'
  : 'https://api.qute.my';
