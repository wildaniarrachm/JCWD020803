import { api } from '../../libs/server.api';
import * as Yup from 'yup';
export const addCities = async (data) => {
  try {
    const response = await api.post(`cities`, data);
    return response;
  } catch (error) {
    return(error);
  }
};

export const postAddress = async (data) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.post(`address`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const addressSchema = Yup.object().shape({
  street: Yup.string()
    .required('Street required')
    .matches(
      /^(?=.*\d)[a-zA-Z0-9\s,]+$/,
      'Street must contain at least one digit and can only contain letters, numbers, spaces, and commas',
    )
    .trim(),
  received_name: Yup.string()
    .matches(/^[a-zA-Z\s,]+$/, 'Receiver name only contain letters')
    .required('Please input a received name'),
  label: Yup.string()
    .matches(/^[a-zA-Z\s,]+$/, 'Label only contain letters')
    .required('Please input a label'),
});
