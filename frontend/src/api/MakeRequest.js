import { message } from 'antd';
import axios from 'axios';
import { ROOT_URL, API_PREFIX } from '../constants';
import { useTransition } from 'react';

export const useMakeRequest = () => {
  const [messageApi, contextHolder] = message.useMessage();  
  const { t } = useTransition();

  const makeRequest = async (method, endpoint, data = null) => {
    const url = `${ROOT_URL}/${API_PREFIX}${endpoint}`;
    try {
      const response = await axios({ method, url, data, withCredentials: true }); 
      const payload = response.data || {};
      if (payload.success) {
        messageApi.open({ type: 'success', content: t(payload.success) });  
      }
      return payload;
    } catch (error) {
      const errMsg = error.response?.data?.error
        ? error.response.data.error
        : 'Um erro inesperado aconteceu. Por favor, tente novamente mais tarde!';
      messageApi.open({ type: 'error', content: t(errMsg) });  
      return { error: true, message: errMsg };
    }
  };

  return { makeRequest, contextHolder };
};
