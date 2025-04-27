import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext'

export const useAuthService = () => {
  const { makeRequest } = useContext(ApiContext);

  const initSession = () => makeRequest('post', '/user/init');
  const register    = content => makeRequest('post', '/register', content);
  const login       = content => makeRequest('post', '/login', content);

  return { initSession, register, login };
};
