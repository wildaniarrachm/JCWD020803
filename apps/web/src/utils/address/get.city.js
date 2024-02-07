import { api } from '../../libs/server.api';

export const getCityByProvince = async (data) => {
  try {
    const response = await api.get(`address/city-province?province=${data}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
