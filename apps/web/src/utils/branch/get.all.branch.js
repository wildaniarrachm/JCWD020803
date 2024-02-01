import { api } from '../../libs/server.api';

export const getAllBranch = async (tokenAdmin, page) => {
  let pages = 1;
  if (page) {
    pages = page;
  }
  try {
    const response = await api.get(`branch?${pages}`, {
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
