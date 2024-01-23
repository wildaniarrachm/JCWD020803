import { api } from '../../libs/server.api';

export const recoverAddress = async (id) => {
  try {
    const response = await api.patch(`address/recover-address/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
