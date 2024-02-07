import { api } from '../../libs/server.api';

export const getProductOutsideBranch = async (tokenAdmin) => {
  try {
    const response = await api.get(`product/outside`, {
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};
