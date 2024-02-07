import { api } from '../../libs/server.api';

export const getProductByBranch = async (id) => {
  try {
    const response = await api.get(`branch-product/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
