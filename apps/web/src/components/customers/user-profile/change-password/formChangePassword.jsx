import { Button, Input, Spinner } from '@material-tailwind/react';
import { useFormik } from 'formik';
import {
  changePasswordCustomer,
  passwordSchema,
} from '../../../../utils/customer/change.password';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import adminpict from '../../../../assets/admin-picture.png';
export const FormChangePassword = () => {
  const token = localStorage.getItem('token');
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const handleSubmited = async (values) => {
    setLoad(true);
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
    setLoad(false);
  };
  const formik = useFormik({
    initialValues: {
      OldPassword: '',
      password: '',
    },
    validationSchema: passwordSchema,
    onSubmit: (values, action) => {
      handleSubmited(values);
      action.resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="text-center font-bold text-lg mt-2">
        Create new password
      </h2>
      <div className="laptop:flex laptop:flex-row-reverse laptop:justify-between">
        <div className="h-[300px] w-[50%]">
          <img src={adminpict} className="object-fill h-[100%] w-[100%]" />
        </div>
        <div className="grid grid-cols-1 w-[50%] items-center px-[2%] py-5 font-poppins">
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
            error={formik.touched.password && formik.errors.password}
            required
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-[12px] font-poppins">
              {formik.errors.password}
            </div>
          )}
          <div className="flex justify-end">
            {load === true ? (
              <Button disabled className="flex items-center" fullWidth>
                <Spinner className="mx-auto" />
              </Button>
            ) : (
              <Button type="submit" fullWidth>
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
