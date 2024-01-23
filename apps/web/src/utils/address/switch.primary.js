import { api } from '../../libs/server.api';

export const switchPrimaryAddress = async (checked, id, token) => {
  const data = {
    checked: checked,
    id: id,
  };
  try {
    const response = await api.patch(`address/switch-primary`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
