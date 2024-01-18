import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from '@material-tailwind/react'

import resetpassword from '../../../assets/reset-pass.png';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    registPassSchema,
} from '../../../utils/admin/input-password.admin';
import { resetPasswordAdmin } from '../../../utils/admin/reset-password.admin';

export function ResetPassword() {
  const { tokenAdmin } = useParams()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmation: '',
    },
    validationSchema: registPassSchema,
    onSubmit: (values, action) => {
      resetPasswordAdmin(values, tokenAdmin);
      action.resetForm();
      localStorage.clear();
      navigate('/login-admin');
    },
  });

  return (
    <div className="items-center justify-center bg-main-light flex h-screen ">
      <form onSubmit={formik.handleSubmit}>
        <Card className="w-[21rem] tablet:w-[28rem] laptop:w-[25rem]">
          <Typography
            variant="h1"
            className="pt-10 font-poppins text-3xl text-center text-main-red"
          >
            Reset Password
          </Typography>
          <div className="flex justify-center">
            <img
              className="w-[15rem] tablet:w-[18rem]"
              alt="input-password"
              src={resetpassword}
            />
          </div>
          <CardBody className="flex flex-col gap-2 tablet:gap-3 ">
            <Input
              label="Password"
              size="lg"
              type="password"
              name="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              onChange={formik.handleChange}
            />
            {formik.touched.password || formik.errors.password ? (
              <div className=" mt-[-10px] text-red-200 font-poppins">
                {formik.errors.password}
              </div>
            ) : null}
            <Input
              label="Password Confirmation"
              size="lg"
              type="password"
              name="confirmation"
              onBlur={formik.handleBlur}
              value={formik.values.confirmation}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmation &&
                Boolean(formik.errors.confirmation)
              }
            />
            {formik.touched.confirmation || formik.errors.confirmation ? (
              <div className=" mt-[-10px] text-red-200 font-poppins">
                {formik.errors.confirmation}
              </div>
            ) : null}
          </CardBody>
          <CardFooter className="tablet: pt-2 mb-6">
            <Button
            type='submit'
              className="font-poppins bg-main-blue tablet:text-xl laptop:text-lg"
              fullWidth
            >
              Reset Password
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
