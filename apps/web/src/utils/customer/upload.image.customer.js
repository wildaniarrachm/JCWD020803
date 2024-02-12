import { api } from '../../libs/server.api';

export const uploadImage = async (data, token) => {
  try {
    const response = await api.patch(`customer/upload-image`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};
