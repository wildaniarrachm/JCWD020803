import {
  Button,
  CardBody,
  CardFooter,
  Checkbox,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import { validationSchema } from '../../../../utils/admin/login.admin';
import { ForgotPassword } from '../../desktop-view/Forgot-Password';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MobileLoginAdmin() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen((open) => !open);
  };
  const handleRememberme = (e) => {
    formik.setFieldValue('rememberme', e.target.checked);
  };

  const handleSubmit = async (data) => {
    try {
      console.log(data);
      if (data.input_data.includes('@')) {
        data.email = data.input_data;
        delete data.input_data;
        const response = await api.post(`admins/admin/login`, data);
        setAdmin(response.data[0]);
        localStorage.setItem('token', response.data?.token);
        navigate('/');
        window.location.reload();
      } else if (data.input_data) {
        data.username = data.input_data;
        delete data.input_data;
        const response = await api.post(`admins/admin/login`, data);
        setAdmin(response.data[0]);
        localStorage.setItem('token', response.data?.token);
        navigate('/');
        window.location.reload;
      }
    } catch (error) {
      alert (error.response.data.message)
    }
  };

  const formik = useFormik({
    initialValues: {
      input_data: '',
      password: '',
      rememberme: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      handleSubmit(values);
      action.resetForm();
    },
  });
  return (
    <>
      <div className="items-center justify-center pt-40 min-h-screen bg-main-light">
        <div className="w-auto bg-main-light">
          <Typography
            className="font-poppins text-main-red ml-6"
            variant="h3"
            color="white"
          >
            Sign In
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Input label="Email or Username" size="lg" />
              <Input label="Password" size="lg" />
              <div className="-ml-2.5 flex flex-row-2 gap-14 items-center">
                <Checkbox
                  onChange={handleRememberme}
                  className="font-poppins"
                  label={
                    <Typography className="font-poppins hover:text-main-blue text-base">
                      Remember Me
                    </Typography>
                  }
                />
                <p
                  onClick={handleOpen}
                  className="font-poppins cursor-pointer text-gray-700 hover:text-main-blue"
                >
                  {' '}
                  forgot password{' '}
                </p>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                className="bg-main-blue font-poppins"
                fullWidth
              >
                Sign In
              </Button>
            </CardFooter>
          </form>
        </div>
      </div>
      <ForgotPassword open={open} handleOpen={handleOpen} />
    </>
  );
}
