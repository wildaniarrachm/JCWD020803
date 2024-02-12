import { api } from '../../libs/server.api';

export const getHeadBranch = async () => {
  try {
    const response = await api.get(`branch/head-branch`);
    return response;
  } catch (error) {
    return error;
  }
};
