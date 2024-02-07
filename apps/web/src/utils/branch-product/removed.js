import { api } from '../../libs/server.api';

export const removeProductFromBranch = async (id) => {
  try {
    const response = await api.delete(`branch-product/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
