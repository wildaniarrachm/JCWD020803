import { api } from '../../libs/server.api';

export const getDistanceBranch = async (lat, lng) => {
  try {
    if (lat !== undefined && lng !== undefined) {
      const response = await api.get(`branch/distance?lat=${lat}&lng=${lng}`);
      return response;
    } else {
      const response = await api.get(`branch/distance?lat=&lng=`);
      return response;
    }
  } catch (error) {
    return error;
  }
};
