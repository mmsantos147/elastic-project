import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';


export const useGraphService = () => {
  const { makeRequest } = useContext(ApiContext); 

  const getGraph = (id, depth) => makeRequest('post', `/graph/${id}/${depth}`);

  return { getGraph };
};
