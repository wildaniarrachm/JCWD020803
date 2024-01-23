import { api } from '../../libs/server.api';
import * as Yup from 'yup';

export const changeEmail = async (data, token) => {
  try {
    const response = await api.post(`customer/change-email`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const requestVerifyEmail = async (token) => {
  try {
    const response = await api.get(`customer/request-verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const verifyAccount = async (token) => {
  try {
    const response = await api.get(`customer/verify/${token}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const changeEmailSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
});
