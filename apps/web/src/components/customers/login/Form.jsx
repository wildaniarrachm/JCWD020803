import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  loginCustomer,
  validateLogin,
} from '../../../utils/customer/login.customer';
import {
  Button,
  Checkbox,
  Input,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setData } from '../../../redux/customer.slice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FormLogin = () => {
  const [capsLockActive, setCapsLockActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const capsLockIsOn = event.getModifierState('CapsLock');
      setCapsLockActive(capsLockIsOn);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    const response = await loginCustomer(data);
    if (response?.status === 200) {
      toast.success(response?.data?.message, {
        autoClose: 5000,
      });
      localStorage.setItem('token', response?.data?.token);
      setLoading(false);
      navigate('/');
      window.location.reload();
    } else {
      toast.error(response?.response?.data, {
        autoClose: 5000,
      });
      setLoading(false);
    }
  };
  const handleRemember = (e) => {
    formik.setFieldValue('remember', e.target.checked);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: '',
    },
    validationSchema: validateLogin,
    onSubmit: (values, action) => {
      handleSubmit(values);
      action.resetForm();
    },
  });
  return (
    <>
      <div className="grid grid-cols-1 w-full">
        <form
          className="grid grid-cols-1 gap-5 w-[80%] mx-auto tablet:w-[60%] laptop:w-[40%]"
          onSubmit={formik.handleSubmit}
          data-aos="fade-left"
          data-aos-duration="1500"
        >
          <Input
            label="Email address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-[12px] font-poppins">
              {formik.errors.email}
            </div>
          )}

          <Input
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-[12px] font-poppins">
              {formik.errors.password}
            </div>
          )}
          {capsLockActive && (
            <div
              style={{
                position: 'absolute',
                top: '110px',
                right: '0',
                color: 'black',
                fontSize: '12px',
              }}
            >
              Caps Lock is on
            </div>
          )}
          <small
            className="font-poppins text-gray-700 text-[14px] inline-block hover:underline hover:cursor-pointer decoration-solid "
            onClick={() => navigate('/login-user/forgot-password')}
          >
            Forgot password?
          </small>
          <div className="">
            <Checkbox
              onChange={handleRemember}
              label={
                <div>
                  <Typography color="blue-gray" className="font-small">
                    Remember Me
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    You&apos;ll be able to login without password for 24 hours.
                  </Typography>
                </div>
              }
              containerProps={{
                className: '-mt-5',
              }}
            />
          </div>
          <div className="w-[100%] mt-3">
            {loading === true ? (
              <Button disabled className="w-full">
                <Spinner className="mx-auto" />
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Login
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
