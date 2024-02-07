import { api } from '../../libs/server.api';

export const getVoucherByCode = async (code) => {
  try {
    const response = await api.get(`vouchers/${code}`);
    return response;
  } catch (error) {
    return error;
  }
};
