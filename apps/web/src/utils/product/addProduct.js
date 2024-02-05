import { api } from '../../libs/server.api';

export const addProduct = async (data, token) => {
  try {
    const response = await api.post(`product`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};
