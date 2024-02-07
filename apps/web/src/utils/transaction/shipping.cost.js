import { api } from '../../libs/server.api';

export const shippingCost = async (data) => {
  try {
    const response = await api.post('shipping', data);
    return response;
  } catch (error) {
    return error;
  }
};
