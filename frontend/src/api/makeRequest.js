import { message } from "antd";
import axios from "axios";
import { ROOT_URL, API_PREFIX } from "../constants";

const handleError = (expection) => {
  if (expection.response?.data?.error) {
    message.error(expection.response.data.error);
  } else {
    message.error(
      "Um erro inesperado aconteceu. Por favor, tente novamente mais tarde!"
    );
  }
};

const makeRequest = async (method, endpoint, data = null) => {
  const url = `${ROOT_URL}/${API_PREFIX}/${endpoint}`;
  try {
    const response = await axios({
      method,
      url,
      data,
      withCredentials: true
    });

    const responseData = response.data || {};

    if (responseData.success) message.success(responseData.success);

    return responseData;
  } catch (expection) {
    handleError(expection);
    return { error: true, message: error.message };
  }
};

export { makeRequest };
