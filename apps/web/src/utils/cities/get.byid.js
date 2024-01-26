import { api } from '../../libs/server.api';

export const getCityById = async (id) => {
  try {
    const response = await api.get(`cities/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
