import { Button, Input } from '@material-tailwind/react';
import { useFormik } from 'formik';
import { changePasswordCustomer } from '../../../../utils/customer/change.password';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const FormChangePassword = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const handleSubmited = async (values) => {
    const response = await changePasswordCustomer(values, token);
    if (response?.status === 200) {
      toast.success(response?.data, {
        autoClose: 5000,
      });
      navigate('/customer-dashboard/profile');
    } else {
      toast.error(response?.response?.data, {
        autoClose: 5000,
      });
    }
    console.log(response);
  };
  const formik = useFormik({
    initialValues: {
      OldPassword: '',
      password: '',
    },
    onSubmit: (values, action) => {
      handleSubmited(values);
      action.resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 gap-4 px-[2%] py-5 font-poppins">
        <h2 className="text-center font-bold">Create new password</h2>
        <Input
          name="OldPassword"
          label="Old password"
          type="password"
          value={formik?.values?.OldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Input
          name="password"
          type="password"
          label="New password"
          value={formik?.values?.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </form>
  );
};
