import { useFormik } from 'formik';
import { Button, Input } from '@material-tailwind/react';
import {
  addCustomer,
  registSchema,
} from '../../../../utils/customer/add.customer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const FormRegist = () => {
  useEffect(() => {
    AOS.init({
      disable: false,
      once: false,
      duration: '2000',
    });
  });
  const handleSubmited = async (values) => {
    const response = await addCustomer(values);
    if (response?.status === 200) {
      toast.success(response?.data, {
        position: 'top-right',
        autoClose: 3000,
      });
    } else {
      toast.error(response?.response?.data, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      referral_code: '',
    },
    validationSchema: registSchema,
    onSubmit: (values, action) => {
      handleSubmited(values);
      action.resetForm();
    },
  });

  return (
    <form
      className="w-[100%] flex flex-col gap-5 static tablet:w-[60%] laptop:w-[40%]"
      onSubmit={formik.handleSubmit}
      data-aos="fade-left"
    >
      <div className="grid grid-cols-1 gap-5 items-center font-poppins">
        <Input
          label="First name"
          id="first_name"
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.first_name && formik.errors.first_name}
          required
        />
        {formik.touched.first_name && formik.errors.first_name && (
          <div className="text-red-500 text-[12px] font-poppins">
            {formik.errors.first_name}
          </div>
        )}

        <Input
          label="Last name"
          id="last_name"
          name="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <Input
          label="Username"
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && formik.errors.username}
          required
        />
        {formik.touched.username && formik.errors.username && (
          <div className="text-red-500 text-[12px] font-poppins">
            {formik.errors.username}
          </div>
        )}
        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          required
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-[12px] font-poppins">
            {formik.errors.email}
          </div>
        )}
        <div>
          <small className="font-poppins text-gray-500 text-[12px] inline-block mb-3">
            Optional
          </small>
          <Input
            label="Referral"
            id="referral_code"
            name="referral_code"
            value={formik.values.referral_code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.referral_code && formik.errors.referral_code}
          />
          {formik.touched.referral_code && formik.errors.referral_code && (
            <div className="text-red-500 text-[12px] font-poppins">
              {formik.errors.referral_code}
            </div>
          )}
        </div>
      </div>
      <Button type="submit">Sign Up</Button>
    </form>
  );
};
