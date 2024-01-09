import { api } from '../../libs/server.api';

export const addPhoneNumber = async (data, token) => {
  console.log(data);
  try {
    const response = await api.patch('customer/added-phone-number', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert(response?.data);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
