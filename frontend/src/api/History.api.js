import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';


export const useHistoryService = () => {
  const { makeRequest } = useContext(ApiContext);

  const fetchHistory = () => makeRequest('get', '/history');            
  const deleteItemFromHistory = id => makeRequest('delete', `/history/${id}`);  

  return { fetchHistory, deleteItemFromHistory };
};