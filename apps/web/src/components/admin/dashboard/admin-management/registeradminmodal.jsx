import React from 'react';
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import { addAdmin, registSchema } from '../../../../utils/admin/register.admin';

export function RegisterAdmin({ open, handleOpen }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
    },
    validationSchema: registSchema,
    onSubmit: (values, action) => {
        console.log(values);
      addAdmin(values);
      action.resetForm();
    }
  });
  return (
    <>
    <div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={formik.handleSubmit}> 
        <Card className="mx-auto bg-main-light w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-3">
            <Typography variant="h4" className='font-poppins text-main-blue'>
              Register Admin
            </Typography>
            <Typography
              className="mb-3 text-gray-800 font-poppins"
              variant="paragraph"
            >
              Enter your admin's data below
            </Typography>
              
              <Typography className="my-2 text-main-blue font-poppins" variant="h6">
                Name
              </Typography>
              <Input
                label=" full name"
                size="lg"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                required
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-[12px] font-poppins">
                  {formik.errors.name}
                </div>
              )}
              <Typography className="my-2" variant="h6">
                Username
              </Typography>
              <Input
                label="username"
                size="lg"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                required
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-[12px] font-poppins">
                  {formik.errors.username}
                </div>
              )}
              <Typography className="my-2" variant="h6">
                {' '}
                Email
              </Typography>
              <Input
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                required
                label="email"
                size="lg"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-[12px] font-poppins">
                  {formik.errors.email}
                </div>
              )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button className='font-poppins bg-main-blue' type='submit' fullWidth>
              Add Admin
            </Button>
          </CardFooter>
        </Card>
        </form>
      </Dialog>
    </div>
    </>
  );
}
