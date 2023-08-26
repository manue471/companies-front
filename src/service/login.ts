import api from './api';
import { Login, LoginResponse } from './types';

export const login = async (body: Login) => {
  const response = await api.post<LoginResponse>('auth/login', body);
  sessionStorage.setItem('token', response.data.access_token);
  return response.data;
}