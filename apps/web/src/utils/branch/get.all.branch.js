import { api } from '../../libs/server.api';

export const getAllBranch = async (tokenAdmin, pages) => {
  try {
    console.log(pages);
    const response = await api.get(`branch?pages=${pages}`, {
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
