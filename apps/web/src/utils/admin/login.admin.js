import { setAdminData } from '../../redux/admin.slice'
import { api } from '../../libs/server.api'
import * as Yup from 'yup';

export const handleSubmit = async (data, navigate, dispatch) => {
  try {
    console.log(data);
    if (data.input_data.includes('@')){
      data.email = data.input_data;
      delete data.input_data;
      const response = await api.post(`admins/admin/login`, data);
      console.log(response);
      dispatch(setAdminData(response.data.admin));
      localStorage.setItem('tokenAdmin', response.data.token);
      navigate('/admin-management')
      window.location.reload();
    } else if (data.input_data) {
      data.username = data.input_data;
      delete data.input_data;
      const response = await api.post(`admins/admin/login`, data);
      console.log(response);
      dispatch(setAdminData(response.data.admin));
      localStorage.setItem('tokenAdmin', response.data.token);
      navigate('/admin-management');
      window.location.reload
    }
  } catch (error) {
    console.log(error);
    alert (error.response.data.message || 'error')
  }
};

export const validationSchema = Yup.object({
    input_data: Yup.string()
      .required("This field can't be empty"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Password can't be empty"),
});


