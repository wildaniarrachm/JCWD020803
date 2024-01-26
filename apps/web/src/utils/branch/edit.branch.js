import { api } from '../../libs/server.api';

export const editBranch = async (data, tokenAdmin) => {
  try {
    const response = await api.patch(`branch`, data, {
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
