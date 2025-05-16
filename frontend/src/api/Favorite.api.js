import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';


export const useFavoriteSearch = () => {
  const { makeRequest } = useContext(ApiContext);

  const favoriteItem = content => {
        makeRequest('post', '/favorite', {
            id: "0",
            elasticId: content.id,
            title: content.title,
            url: content.url,
            content: content.content,
            readingTime: content.reading_time,
            date: content.datetime
        })
    };            
  const deleteFavoriteItem = id => makeRequest('delete', `/favorite/${id}`);  
  const getAllFavorites = () => makeRequest('get', '/favorite');

  return { favoriteItem, deleteFavoriteItem, getAllFavorites };
};