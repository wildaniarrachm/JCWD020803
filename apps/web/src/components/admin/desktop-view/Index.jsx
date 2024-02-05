import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from '@material-tailwind/react';
import adminpict from '../../../assets/admin-picture.png';
import logo from '../../../assets/ez-mart-logo.png';
import { useFormik } from 'formik';
import { useState } from 'react';
import { ForgotPassword } from './Forgot-Password';
import {
  handleSubmit,
  validationSchema,
} from '../../../utils/admin/login.admin';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function LoginAdmin() {
  const [admin, setAdmin] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen((open) => !open);
  };

  const handleRememberme = (e) => {
    formik.setFieldValue('rememberme', e.target.checked);
  };

  const formik = useFormik({
    initialValues: {
      input_data: '',
      password: '',
      rememberme: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      console.log(values);
      handleSubmit(values, navigate, dispatch);
      action.resetForm();
    },
  });

  return (
    <>
      <div className=" flex desktop:flex-row min-h-screen">
        <div className=" flex flex-col gap-6 bg-main-light w-1/2 ">
          <div className="flex p-6 justify-center items-center">
            <img src={logo} className="h-20 w-60" />
          </div>
          <div className="flex items-center justify-center">
            <Card className="" color="transparent" shadow={false}>
              <Typography
                className="font-poppins text-main-red"
                variant="h4"
                color="blue-gray"
              >
                Sign In
              </Typography>
              <form
                onSubmit={formik.handleSubmit}
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              >
                <div className="mb-1 flex flex-col gap-4">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="-mb-3 font-poppins"
                  >
                    Email or Username
                  </Typography>
                  <Input
                    size="lg"
                    name="input_data"
                    placeholder="Input your username or email"
                    className=" !border-gray-600 focus:!border-main-blue"
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.input_data}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.input_data || formik.errors.input_data ? (
                    <div className=" mt-[-20px] text-red-900">
                      {formik.errors.input_data}
                    </div>
                  ) : null}
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    name="password"
                    placeholder="Input your password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    className=" !border-gray-600 focus:!border-main-blue"
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                  />
                  {formik.touched.password || formik.errors.password ? (
                    <div className=" mt-[-20px] text-red-900">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <div className=" flex flex-row items-center justify-between">
                  <div>
                    <Checkbox
                      color="red"
                      name="rememberme"
                      type="checkbox"
                      label={
                        <Typography
                          color="gray"
                          className="flex items-center font-poppins hover:text-main-blue"
                        >
                          Remember Me
                        </Typography>
                      }
                      onChange={handleRememberme}
                      containerProps={{ className: '-ml-2.5' }}
                    />
                  </div>
                  <div>
                    <Typography
                      onClick={handleOpen}
                      className="font-poppins cursor-pointer hover:text-main-blue"
                    >
                      {' '}
                      Forgot Password?{' '}
                    </Typography>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="mt-6 font-poppins bg-main-blue"
                  fullWidth
                >
                  Sign In
                </Button>
              </form>
            </Card>
          </div>
        </div>
        <div className="hidden md:block">
          <img className="h-100 w-100" src={adminpict} />
        </div>
      </div>
      <ForgotPassword open={open} handleOpen={handleOpen} />
    </>
  );
}
