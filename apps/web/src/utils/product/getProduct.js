import { api } from '../../libs/server.api';

export const getAllProducts = async (page) => {
  try {
    const response = await api.get(`product?page=${page}`);
    return response;
  } catch (error) {
    return error;
  }
};
