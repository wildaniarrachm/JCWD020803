import { api } from '../../libs/server.api';
import { setData } from '../../redux/customer.slice';

export const keepLoginCustomer = async (dispatch, token) => {
  try {
    const response = await api.get(`customer/keep-login`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response?.status === 200) {
      dispatch(setData(response?.data?.result));
    }
  } catch (error) {
    if (error) {
      localStorage.removeItem('token');
      console.log(error);
    }
  }
};
