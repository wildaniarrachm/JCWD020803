import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import { sendVerificationEmail } from '../../../utils/customer/reset.password';

export const FormForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values, action) => {
      sendVerificationEmail(values);
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
          <Button type="submit">Send request</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
