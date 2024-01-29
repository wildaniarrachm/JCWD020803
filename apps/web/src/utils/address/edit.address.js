import { api } from '../../libs/server.api';

export const editAddress = async (data, token) => {
  try {
    const response = await api.patch(`address/edit-address`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
