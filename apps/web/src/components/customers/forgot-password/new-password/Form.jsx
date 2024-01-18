import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import { passwordSchema } from '../../../../utils/customer/set-password.customer';
import { resetPassword } from '../../../../utils/customer/reset.password';
import { useParams } from 'react-router-dom';

export const FormNewPassword = () => {
  const { token } = useParams();
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: passwordSchema,
    onSubmit: (values, action) => {
      resetPassword(values, token);
      action.resetForm();
    },
  });
  return (
    <Card className="mx-6 shadow-lg">
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
            Enter your new password.
          </Typography>
          <div className="flex flex-col gap-5">
            <Input
              variant="outlined"
              label="Your password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-[12px] font-poppins">
                {formik.errors.password}
              </div>
            )}
            <Input
              variant="outlined"
              label="Confirm Password"
              name="confirm_password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
              required
            />
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
                <div className="text-red-500 text-[12px] font-poppins">
                  {formik.errors.confirm_password}
                </div>
              )}
          </div>
        </CardBody>
        <CardFooter className="pt-0 mx-auto">
          <Button type="submit">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
