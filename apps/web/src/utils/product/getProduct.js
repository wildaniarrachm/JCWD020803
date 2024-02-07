import { api } from '../../libs/server.api';


export const getAllProducts = async (page, tokenAdmin) => {
  try {
    const response = await api.get(`product?page=${page}`, {
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};
