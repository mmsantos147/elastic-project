import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import emitter from '../eventBus';


export const useSearchService = () => {
  const { makeRequest } = useContext(ApiContext);

  const search = async (content) => {
    const requestData = {
      ...content,
      requestId: content.requestId || Date.now().toString()
    };
    
    emitter.emit("new-ai-request", requestData.requestId);
    return makeRequest('post', '/search', requestData);
  };

  const searchAsYouType = async (content) => {
    return makeRequest('post', '/search/suggestions', content);
  };

  const fetchHistory = async () => {
    return makeRequest('get', '/history');
  };

  return { search, searchAsYouType, fetchHistory };
};
