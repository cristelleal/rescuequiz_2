import { Api } from './generated/typing';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const api = new Api({
  baseURL: baseUrl,
});

export default api;
