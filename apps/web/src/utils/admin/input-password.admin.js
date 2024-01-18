import * as Yup from 'yup'
import { api } from '../../libs/server.api';

export const registPassSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Password should contains at least 8 characters')
      .matches(/[0-9]/, 'Password should have at least 1 number')
      .required("This field can't be empty"),
    confirmation: Yup.string()
      .oneOf([Yup.ref('password')], "Password doesn't match")
      .required("This field can't be empty"),
});

export const getAdminByToken = async (tokenAdmin) => {
  try{
    console.log(tokenAdmin);
    const response = await api.get(`admins/admin/create-password/${tokenAdmin}`)
    return response;
  } catch (error){
    console.log(error);
  }
}

export const createPasswordAdmin = async (data, tokenAdmin) => {
  try{
    const response = await api.post(`admins/admin/create-password`, data,{
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


