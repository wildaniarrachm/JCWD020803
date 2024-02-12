import { api } from '../../libs/server.api';

export const getProductByBranch = async (id, page) => {
  try {
    const response = await api.get(`branch-product?id=${id}&page=${page}`);
    return response;
  } catch (error) {
    return error;
  }
};
