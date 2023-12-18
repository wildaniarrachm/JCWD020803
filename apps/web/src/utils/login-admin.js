import {useFormik} from 'formik'
import * as Yup from 'yup'


const validationScheme = Yup.object({
    password: Yup.string().min(4, 'Minimum 4 characters'),
  });

const handleSubmit = async (data) => {
  try {
    console.log(data);
      if (data.input_data.includes("@")) {
        data.email = data.input_data;
        delete data.input_data;
        const response = await axios.post(
          `http://localhost:2000/users/login`,
          data
        );
        notify();
        setUser(response.data[0]);
        localStorage.setItem("token", response.data?.token);
        navigate("/discovery");
        window.location.reload();
      } else {
        data.username = data.input_data;
        delete data.input_data;
        const response = await axios.post(
          `http://localhost:2000/users/login`,
          data
        );
        setUser(response.data[0]);
        localStorage.setItem("token", response.data?.token);
        navigate("/");
        window.location.reload();
      }
      console.log(response.data[0]);
  } catch (err) {
    console.log(err);
  }
};

const formik = useFormik({
  initialValues: {
    username: '',
    password: '',
  },
  validationSchema: validationScheme,
  onSubmit: (values, action) => {
    handleSubmit(values);
    action.resetForm();
  },
});