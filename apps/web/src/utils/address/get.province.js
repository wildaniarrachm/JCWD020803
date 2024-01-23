import { api } from '../../libs/server.api';

export const getAllProvince = async () => {
  try {
    const response = await api.get(`address/province`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
