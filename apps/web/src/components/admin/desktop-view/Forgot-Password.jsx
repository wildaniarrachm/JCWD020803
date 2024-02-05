import React from 'react';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import email from '../../../assets/email.png';
import { sendEmailVerification } from '../../../utils/admin/reset-password.admin';

export function ForgotPassword({ open, handleOpen }) {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values, action) => {
      sendEmailVerification(values);
      console.log(values);
      action.resetForm;
    },
  });

  return (
    <>
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto bg-main-light w-full max-w-[22rem]">
          <form onSubmit={formik.handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <div>
                <Typography
                  variant="h4"
                  className="font-poppins text-center text-main-red"
                >
                  Forgot Password?
                </Typography>
              </div>

              <img src={email} className="h-[12rem] w-[15rem] mx-7" />
              <Typography className="-mb-2 font-poppins" variant="h6">
                Input your email here
              </Typography>
              <Input
                type="text"
                name="email"
                label="Email"
                size="lg"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
              {formik.touched.email || formik.errors.email ? (
                <div className=" mt-[-20px] text-red-900">
                  {formik.errors.email}
                </div>
              ) : null}
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                className="bg-main-blue font-poppins"
                fullWidth
              >
                Reset Password
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
