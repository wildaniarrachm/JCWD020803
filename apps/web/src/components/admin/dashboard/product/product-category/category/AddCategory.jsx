import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useFormik } from 'formik';
import {
  addCategory,
  addCategorySchema,
} from '../../../../../../utils/product/category.product';

export const AddCategory = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: addCategorySchema,
    onSubmit: (values, action) => {
      console.log(values);
      // addCategory(values);
      action.resetForm();
    },
  });

  return (
    <>
      <div className=" flex flex-row justify-between p-16">
        <div className="flex flex-col">
          <Typography className="font-poppins text-main-blue text-[20px]">
            {' '}
            Category{' '}
          </Typography>
          <Input
            labelProps={{ className: 'hidden' }}
            className=" w-[16rem] bg-white focus:!border-main-blue"
            icon={<MagnifyingGlassIcon />}
          />
        </div>
        <div className=" flex flex-col">
          <Typography className="font-poppins text-main-blue text-[20px]">
            {' '}
            add category
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-row">
              <Input
                name="name"
                labelProps={{ className: 'hidden' }}
                placeholder="Input category"
                className="font-poppins w-[17rem] bg-white  focus:!border-main-blue"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                required
              />
              <Button
                type="submit"
                className="w-[14rem] ml-[20px] font-poppins text-[12px] bg-main-blue"
              >
                {' '}
                + Add Category{' '}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
