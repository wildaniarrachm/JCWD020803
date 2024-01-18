import * as Yup from 'yup'
import { api } from '../../libs/server.api';

export const resetPassSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Password should contains at least 8 characters')
      .matches(/[0-9]/, 'Password should have at least 1 number')
      .required("This field can't be empty"),
    confirmation: Yup.string()
      .oneOf([Yup.ref('password')], "Password doesn't match")
      .required("This field can't be empty"),
});

export const sendEmailVerification = async (data) => {
    try{
        const response = api.post(`admins/forgot-password`, data)
    } catch (error){
        console.log(error);
    }
}

export const resetPasswordAdmin = async (data, tokenAdmin) => {
  try{
    const response = await api.patch(`admins/reset-password`, data,{
      headers: {
        Authorization: `Bearer ${tokenAdmin}`
      }
    });
    if (response.status === 200 ) {
      alert(response.data);
    } else {
      return;
    }
  } catch (error){
    console.log(error);
  }
};