import { api } from '../../libs/server.api';

export const switchDeliveriedAddress = async (data, token) => {
  const newData = {
    id: data,
  };
  try {
    const response = await api.patch(`address/switch-deliveried`, newData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};
