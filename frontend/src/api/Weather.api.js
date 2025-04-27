import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';


export const useWeatherService = () => {
  const { makeRequest } = useContext(ApiContext); 

  const getWeatherCondition = () => makeRequest('get', '/weatherReport');

  return { getWeatherCondition };
};
