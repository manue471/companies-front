import { api } from './api';
import { Company } from './types';

export const getCategories = async () => {
  const response = await api.get<any>('categories');
  return response.data;
}