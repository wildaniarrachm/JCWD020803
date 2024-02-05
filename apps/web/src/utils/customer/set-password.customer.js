import { api } from '../../libs/server.api';
import * as Yup from 'yup';

export const getCustomerByToken = async (token) => {
  try {
    const response = await api.get(`customer/create-password/${token}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const createPasswordCustomer = async (data, token) => {
  try {
    const response = await api.post(`customer/create-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const passwordSchema = Yup.object({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .matches(/[0-9]/, 'Password must contain at least 1 digit')
    .matches(
      /[!@#$%^&*(),.?":{}|<>_-]/,
      'Password must contain at least 1 special character (!@#$%^&*(),.?":{}|<>_-)',
    )
    .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords doesnt match')
    .required('Confirm Password is required'),
});
