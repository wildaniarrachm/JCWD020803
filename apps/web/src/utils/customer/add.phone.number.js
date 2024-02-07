import { api } from '../../libs/server.api';

export const addPhoneNumber = async (data, token) => {
  try {
    const response = await api.patch('customer/added-phone-number', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
