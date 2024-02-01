import { api } from '../../libs/server.api';

export const changePasswordCustomer = async (data, token) => {
  try {
    const response = await api.post(`customer/change-password`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};
