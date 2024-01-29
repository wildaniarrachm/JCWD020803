import { api } from '../../libs/server.api';

export const verifyPhoneNumber = async (token) => {
  try {
    const response = await api.patch(`customer/verify-phone-number`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
