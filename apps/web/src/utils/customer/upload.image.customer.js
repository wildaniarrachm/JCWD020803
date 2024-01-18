import { api } from '../../libs/server.api';

export const uploadImage = async (data) => {
  try {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('images', data.images);
    const response = await api.patch(`customer/upload-image`, formData);
    alert(response?.data);
  } catch (error) {
    console.log(error);
  }
};
