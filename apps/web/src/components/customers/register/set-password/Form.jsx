import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Button,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createPasswordCustomer,
  passwordSchema,
} from '../../../../utils/customer/set-password.customer';

export const FormSetPassword = ({token}) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: passwordSchema,
    onSubmit: (values, action) => {
      createPasswordCustomer(values, token);
      action.resetForm();
      localStorage.clear();
      navigate('/');
    },
  });
  return (
    <Card className="w-96">
      <h1 className="text-center font-poppins font-bold text-[24px]">
        Your account has been verified now!
      </h1>
      <h2 className="text-center font-poppins text-[20px]">
        Create your password
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="password"
            size="lg"
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
            required
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-[12px] font-poppins">
              {formik.errors.password}
            </div>
          )}
          <Input
            label="Confirm Password"
            size="lg"
            id="confirm_password"
            name="confirm_password"
            type="password"
            value={formik.values.confirm_password}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirm_password && formik.errors.confirm_password
            }
            onChange={formik.handleChange}
            required
          />
          {formik.touched.confirm_password &&
            formik.errors.confirm_password && (
              <div className="text-red-500 text-[12px] font-poppins">
                {formik.errors.confirm_password}
              </div>
            )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth type="submit">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
