import { api } from '../../libs/server.api';

export const sendVerificationEmail = async (data) => {
  try {
    const response = await api.post(`customer/reset-password`, data);
    alert(response?.data);
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (data, token) => {
  try {
    const response = await api.patch(`customer/new-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert(response?.data);
  } catch (error) {
    console.log(error);
  }
};
