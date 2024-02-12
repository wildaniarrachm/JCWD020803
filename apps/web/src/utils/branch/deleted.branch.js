import { api } from '../../libs/server.api';

export const deleteBranch = async (id, tokenAdmin) => {
  try {
    const response = await api.get(`branch/delete/${id}`, {
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};
