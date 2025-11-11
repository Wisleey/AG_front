/**
 * Cliente API configurado com Axios
 */

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de resposta para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro da API
      const message = error.response.data?.error?.message || 'Erro ao processar requisição';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Erro de rede
      return Promise.reject(new Error('Erro de conexão com o servidor'));
    }
    return Promise.reject(error);
  }
);

export default api;




