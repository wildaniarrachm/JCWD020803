import { api } from '../../libs/server.api';

export const getCustomerAddress = async (token) => {
  try {
    if(token){

      const response = await api.get(`address/customer`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }
  } catch (error) {
    console.log(error);
  }
};

export const getAddressById = async (id) => {
  try {
    const response = await api.get(`address/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
