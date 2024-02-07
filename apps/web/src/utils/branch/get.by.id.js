import { api } from '../../libs/server.api';

export const getBranchById = async (id, token) => {
  try {
    const response = await api.get(`branch/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
