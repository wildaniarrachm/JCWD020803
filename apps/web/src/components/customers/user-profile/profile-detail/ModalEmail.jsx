import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
} from '@material-tailwind/react';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FormEditEmail } from './FormEditEmail';
import {
  changeEmail,
  changeEmailSchema,
} from '../../../../utils/customer/change.email';
import { useFormik } from 'formik';

export const ModalEmail = ({ email }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const token = localStorage.getItem('token');

  const handleChangeEmail = async (data) => {
    const response = await changeEmail(data, token);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: changeEmailSchema,
    onSubmit: (values, action) => {
      handleChangeEmail(values);
      action.resetForm();
    },
  });
  return (
    <>
      <IconButton
        onClick={handleOpen}
        variant="outlined"
        className="rounded-full"
        size="md"
      >
        <FaRegEdit size={16} />
      </IconButton>
      <Dialog size={'sm'} open={open} handler={handleOpen}>
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>Change Email</DialogHeader>
          <DialogBody>
            <FormEditEmail
              email={email}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email}
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="outlined"
              className="mr-5 border border-main-pink hover:bg-main-pink hover:text-white"
              onClick={() => handleOpen(null)}
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              type="submit"
              onClick={() => handleOpen(null)}
            >
              <span>Save</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};
