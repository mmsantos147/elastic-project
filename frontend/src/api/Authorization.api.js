import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext'

export const useAuthService = () => {
  const { makeRequest } = useContext(ApiContext);

  const initSession = () => makeRequest('post', '/user/init');
  const register    = content => makeRequest('post', '/user/register', content);
  const login       = content => makeRequest('post', '/user/login', content);
  const logout      = () => makeRequest('post', '/user/logout');
  const verify      = () => makeRequest('post', '/user/verify');
  

  return { initSession, register, login, verify, logout };
};
