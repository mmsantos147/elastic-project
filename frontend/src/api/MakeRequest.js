import { message } from 'antd';
import axios from 'axios';
import { ROOT_URL, API_PREFIX } from '../constants';
import i18n from '../utils/i18n';

export const useMakeRequest = () => {
  const [messageApi, contextHolder] = message.useMessage();  

  const makeRequest = async (method, endpoint, data = null) => {
    const url = `${ROOT_URL}/${API_PREFIX}${endpoint}`;
    try {
      const response = await axios({ method, url, data, withCredentials: true }); 
      const payload = response.data || {};
      if (payload.success) {
        messageApi.open({ type: 'success', content: i18n.t(payload.success) });  
      }
      return payload;
    } catch (error) {
      const errMsg = error.response?.data?.error
        ? error.response.data.error
        : i18n.t('unexpected_error');
      messageApi.open({ type: 'error', content: i18n.t(errMsg) });  
      return { error: true, message: errMsg };
    }
  };

  return { makeRequest, contextHolder };
};
