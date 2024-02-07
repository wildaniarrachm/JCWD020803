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

export const addIntoBranch = async (data, tokenAdmin) => {
  try {
    const response = await api.post(`product/add-to-branch`, data, {
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};