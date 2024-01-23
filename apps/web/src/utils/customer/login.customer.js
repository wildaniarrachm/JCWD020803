import { api } from '../../libs/server.api';
import * as Yup from 'yup';

  export const loginCustomer = async (data) => {
    try {
      const response = await api.post(`customer/login`, data);
      return response;
    } catch (error) {
      return error;
    }
  };

export const validateLogin = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .matches(/[0-9]/, 'Password must contain at least 1 digit')
    .matches(
      /[!@#$%^&*(),.?":{}|<>_-]/,
      'Password must contain at least 1 special character (!@#$%^&*(),.?":{}|<>_-)',
    )
    .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .required('Password is required'),
});
