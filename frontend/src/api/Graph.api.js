import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';


export const useGraphService = () => {
  const { makeRequest } = useContext(ApiContext); 

  const getGraph = (id, depth) => makeRequest('get', `/graph/${id}/${depth}`);

  return { getGraph };
};
