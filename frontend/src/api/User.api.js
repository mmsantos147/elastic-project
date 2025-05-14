import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';


export const useUserService = () => {
  const { makeRequest } = useContext(ApiContext); 

  const setFavorite = content => makeRequest('post', '/favorite', content);
  const getFavorites = () => makeRequest('get', '/favorite');
  const removeFavorite = id => makeRequest('post', `/favorite/${id}`)

  return { setFavorite, getFavorites, removeFavorite };
};
