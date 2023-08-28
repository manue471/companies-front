import { AxiosError } from 'axios';
import { api } from './api';
import { Company } from './types';

export const getCompanies = async () => {
  const response = await api.get<{ data: Company[] }>('companies');
  return response.data.data;
}

export const saveCompany = async (body: Company) => { 
  try {
    const response = await api.post<Company>('companies', body);
    return response.data;
  } catch (err: any) {
    return err?.response.data as AxiosError;
  }
}