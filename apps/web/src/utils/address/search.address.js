import { api } from '../../libs/server.api';
export const searchAddress = async (received_name, token) => {
  try {
    const response = await api.get(
      `address/search?received_name=${received_name}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    return error;
  }
};
