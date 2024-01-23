import { api } from '../../libs/server.api';

export const deleteAddress = async (id) => {
  try {
    const response = await api.patch(`address/delete-address/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deletePermanentAddress = async (id) => {
  try {
    const response = await api.delete(`address/delete-permanent/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
