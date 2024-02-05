import { api } from '../../libs/server.api';

export const getAllCategory = async () => {
  try {
    const response = await api.get(`categories`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getSubCategory = async (id) => {
  try {
    const response = await api.get(`categories/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
