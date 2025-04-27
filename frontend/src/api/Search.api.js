import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';


export const useSearchService = () => {
  const { makeRequest } = useContext(ApiContext);

  const search = async (content) => {
    return makeRequest('post', '/search', content);
  };

  const searchAsYouType = async (content) => {
    return makeRequest('post', '/search/suggestions', content);
  };

  const fetchHistory = async () => {
    return makeRequest('get', '/history');
  };

  return { search, searchAsYouType, fetchHistory };
};
