import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import { sendVerificationEmail } from '../../../utils/customer/reset.password';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const FormForgotPassword = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    setLoad(true);
    const response = await sendVerificationEmail(values);
    if (response?.status === 200) {
      toast.success(response?.data, {
        autoClose: 3000,
        position: 'top-right',
      });
      navigate('/login-user');
    } else {
      toast.error(response?.response?.data, {
        autoClose: 3000,
        position: 'top-right',
      });
      setLoad(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values, action) => {
      handleSubmit(values);
      action.resetForm();
    },
  });
  return (
    <Card className="mx-auto shadow-lg w-[70%]">
      <form onSubmit={formik.handleSubmit}>
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-center font-poppins"
          >
            Reset Password
          </Typography>
          <Typography className="font-poppins text-center pb-4">
            Enter your email address to request password reset.
          </Typography>
          <Input
            variant="outlined"
            label="Your Email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
          />
        </CardBody>
        <CardFooter className="pt-0 mx-auto">
          <Button type="submit" disabled={load === true}>
            {load === true ? <Spinner /> : ' Send request'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
