import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Button,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  createPasswordCustomer,
  passwordSchema,
} from '../../../../utils/customer/set-password.customer';
import { toast } from 'react-toastify';

export const FormSetPassword = ({ token }) => {
  const navigate = useNavigate();
  const handleSubmited = async (values) => {
    const response = await createPasswordCustomer(values, token);
    if (response?.status === 200) {
      toast.success(response?.data, {
        position: 'top-right',
        autoClose: 3000,
      });
      localStorage.removeItem('token');
      navigate('/login-user');
    } else {
      toast.error(response?.response?.data, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      handleSubmited(values);
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
