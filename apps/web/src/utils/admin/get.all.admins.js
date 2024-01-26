import { api } from '../../libs/server.api';

export const getAllAdmin = async (token) => {
  try {
    const response = await api.get(`admins/admin/get-admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
