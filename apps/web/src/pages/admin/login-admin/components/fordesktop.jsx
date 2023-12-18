import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from '@material-tailwind/react';
  import adminpict from '../../../../assets/admin-picture.png';
  import logo from '../../../../assets/long-logo.png';
  import { useFormik } from 'formik';
  import * as Yup from 'yup';
  import axios from 'axios';
  import { useState } from 'react';
  import { ForgotPassword } from '../components/modal';
  
  const validationScheme = Yup.object({
    password: Yup.string().min(4, 'Minimum 4 characters'),
  });
  
  export function LoginAdmin() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen((open) => !open);
    };
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
    return (
      <>
        <div className=" flex desktop:flex-row min-h-screen">
          <div className=" flex flex-col gap-20 bg-main-light w-1/2 ">
            <div className="flex justify-center items-center">
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
                      name="username"
                      placeholder="Input your username or email"
                      className=" !border-main-pink focus:!border-main-blue"
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                      Password
                    </Typography>
                    <Input
                      type="password"
                      size="lg"
                      name="password"
                      placeholder="Input your password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password && Boolean(formik.errors.password)
                      }
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
                  <div className=" flex flex-row">
                    <div>
                      <Checkbox
                        label={
                          <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center font-normal mr-9"
                          >
                            Remember Me
                          </Typography>
                        }
                        containerProps={{ className: '-ml-2.5' }}
                      />
                    </div>
                    <div className="mt-3 ml-20">
                      <Typography
                        onClick={handleOpen}
                        className="font-poppins cursor-pointer"
                      >
                        {' '}
                        Forgot Password?{' '}
                      </Typography>
                    </div>
                  </div>
                  <Button type="submit" className="mt-6 font-poppins" fullWidth>
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
  