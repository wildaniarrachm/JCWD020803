import { api } from '../../libs/server.api';

export const sendReverification = async (data) => {
  try {
    const response = await api.post(`customer/reverification`, data);
    return response;
  } catch (error) {
    return error;
  }
};
