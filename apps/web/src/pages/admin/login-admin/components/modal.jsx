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
import * as Yup from 'yup';
import axios from 'axios';

export function ForgotPassword({ open, handleOpen }) {
  const ValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('email is required'),
  });
  const handleSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/sample`,
      );
    } catch (err) {
      console.log(err);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: (values, action) => {
      handleSubmit(values);
      action.resetForm();
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
        <Card className="mx-auto w-full max-w-[28rem]">
          <form onSubmit={formik.handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Reset Password
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              ></Typography>
              <Typography className="-mb-2" variant="h6">
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
              <Button type="submit" variant="gradient" fullWidth>
                Reset Password
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
