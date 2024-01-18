import { setData } from '../../redux/customer.slice';
import { api } from '../../libs/server.api';
import * as Yup from 'yup';

export const loginCustomer = async (
  data,
  handleReaload,
  navigate,
  setLoading,
  dispatch,
) => {
  try {
    const response = await api.post(`customer/login`, data);
    console.log(response);
    if (response?.data?.token) {
      localStorage.setItem('token', response?.data?.token);
      dispatch(setData(response?.data?.result));
      navigate('/');
      handleReaload();
    }
    setLoading(true);
    alert(response?.data?.message);
  } catch (error) {
    console.log(error);
    alert(error?.response?.data);
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
