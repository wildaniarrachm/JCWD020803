import { api } from '../../libs/server.api';
import * as Yup from 'yup';
export const changePasswordCustomer = async (data, token) => {
  try {
    const response = await api.post(`customer/change-password`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const passwordSchema = Yup.object({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .matches(/[0-9]/, 'Password must contain at least 1 digit of number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>_-]/,
      'Password must contain at least 1 special character (!@#$%^&*(),.?":{}|<>_-)',
    )
    .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .required('Password is required'),
});
