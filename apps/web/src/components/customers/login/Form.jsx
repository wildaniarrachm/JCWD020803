import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  loginCustomer,
  validateLogin,
} from '../../../utils/customer/login.customer';
import { Button, Input, Spinner } from '@material-tailwind/react';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleReload = () => {
    window.location.reload();
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validateLogin,
    onSubmit: (values, action) => {
      loginCustomer(values, handleReload, navigate, setLoading, dispatch);
      action.resetForm();
    },
  });
  return (
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
          className="font-poppins text-gray-700 text-[14px]  inline-block hover:underline decoration-solid"
          onClick={() => navigate('/login-user/forgot-password')}
        >
          Forgot password?
        </small>
        {loading === true ? (
          <Button disabled>
            <Spinner className="mx-auto" />
          </Button>
        ) : (
          <Button type="submit">Login</Button>
        )}
      </form>
    </div>
  );
};
