import * as Yup from 'yup';
import { api } from '../../libs/server.api';

export const addCustomer = async (data) => {
  try {
    const response = await api.post(`customer/register-customer`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const socialRegister = async (data) => {
  try {
    const response = await api.post(`customer/social-register`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const validateReferral = async (referral_code) => {
  try {
    const response = await api.get(
      `customer/get-referral?referral_code=${referral_code}`,
    );
    if (response?.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error?.response && error?.response?.status === 400) {
      return false;
    } else {
      return false;
    }
  }
};

export const registSchema = Yup.object({
  first_name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'First name must contain only letters')
    .required('First name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  referral_code: Yup.string().test(
    'referral-match',
    'Referral doesnt match',
    async function (value) {
      if (value) {
        const isValid = await validateReferral(value);
        return isValid;
      }
      return true;
    },
  ),
});
