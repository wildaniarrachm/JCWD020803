import { api } from '../../libs/server.api';

export const getAllBranch = async (tokenAdmin) => {
  try {
    const response = await api.get(`branch`, {
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
