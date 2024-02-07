import { api } from '../../libs/server.api';

export const deleteBranch = async (id, tokenAdmin) => {
  console.log(id, tokenAdmin);
  try {
    const response = await api.get(`branch/delete/${id}`, {
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
