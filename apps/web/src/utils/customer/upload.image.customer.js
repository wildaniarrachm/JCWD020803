import { api } from '../../libs/server.api';

export const uploadImage = async (data, token) => {
  console.log(data);
  try {
    const response = await api.patch(`customer/upload-image`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
