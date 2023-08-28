import { api } from '../api'

export const getCitiesByState = async (stateId: string) => { 
  const response = await api.get(`state-cities/cities?state_id=${stateId}`);
  return response.data;
} 

export const getStates = async () => {
  const response = await api.get('state-cities/states');
  return response.data;
}

export const getCityByLatLong = async (lat: number, long: number) => {
  const response = await api.get(`state-cities/city?lat=${lat}&long=${long}`);
  return response.data;
}