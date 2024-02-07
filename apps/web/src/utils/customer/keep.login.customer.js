import { api } from '../../libs/server.api';

export const keepLoginCustomer = async (token) => {
  try {
    const response = await api.get(`customer/keep-login`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    if (error) {
      localStorage.removeItem('token');
      console.log(error);
    }
  }
};
