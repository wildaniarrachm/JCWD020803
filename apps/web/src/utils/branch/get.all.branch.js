import { api } from '../../libs/server.api';

export const getAllBranch = async (tokenAdmin, pages) => {
  try {
    const response = await api.get(`branch?pages=${pages}`, {
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};
