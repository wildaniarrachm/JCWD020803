import { api } from '../../libs/server.api';

export const addNewBranch = async (data, tokenAdmin) => {
  try {
    const response = await api.post(`branch`, data, {
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
