import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import { sendReverification } from '../../../utils/customer/re-verification.email';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const Reverification = () => {
  const [limit, setLimit] = useState(false);
  const [load, setLoad] = useState(false);
  const handleSubmited = async (data) => {
    setLoad(true);
    const response = await sendReverification(data);
    if (response?.status === 200) {
      toast.success(response?.data, {
        autoClose: 5000,
      });
      setLimit(true);
    } else {
      toast.error(response?.response?.data, {
        autoClose: 5000,
      });
    }
    setLoad(false);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values, action) => {
      handleSubmited(values);
      action.resetForm();
    },
  });
  return (
    <Card className="mx-auto shadow-lg w-[70%]">
      <form onSubmit={formik.handleSubmit}>
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-center font-poppins"
          >
            Re-verifcation
          </Typography>
          <Typography className="font-poppins text-center pb-4">
            Enter your email address to request re-verification.
          </Typography>
          <Input
            variant="outlined"
            label="Your Email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
          />
        </CardBody>
        <CardFooter className="pt-0 mx-auto">
          {limit === true ? (
            <Button className="w-full" disabled>
              Request sended
            </Button>
          ) : load === true ? (
            <Button disabled className="w-full">
              <Spinner className="mx-auto" />
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Send request
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
