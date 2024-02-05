import { api } from '../../libs/server.api';

export const getCustomerVouchers = async (customer_id, voucher_id) => {
  try {
    const response = await api.get(
      `user-vouchers/search?customer=${customer_id}&voucher_id=${voucher_id}`,
    );
    return response;
  } catch (error) {
    return error;
  }
};
