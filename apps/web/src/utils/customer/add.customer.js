import axios from 'axios';
import * as Yup from 'yup';

export const addCustomer = async (data) => {
  try {
    const add = await axios.post(
      `${import.meta.env.VITE_API_URL}customer/register-customer`,
      data,
    );
    alert(add?.data);
  } catch (error) {
    console.log(error);
    alert(error?.response?.data);
  }
};

export const registSchema = Yup.object({
  first_name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'First name must contain only letters')
    .required('First name is required'),
  last_name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Last name must contain only letters')
    .required('Last name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  referral: Yup.string(),
});
