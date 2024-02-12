import { api } from '../../libs/server.api';

export const getCityAndProvinceById = async (idCities, idProvince) => {
  try {
    const response = await api.get(
      `address/city-province-id?id=${idCities}&province=${idProvince}`,
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getAddressById = async (id) => {
  try {
    const response = await api.get(`address/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
