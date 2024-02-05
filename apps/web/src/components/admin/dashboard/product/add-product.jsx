import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import { addProduct } from '../../../../utils/product/addProduct';
import { getSubCategory } from '../../../../utils/categories/getCategories';

export const AddProducts = ({ category }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const [subCategory, setSubCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selecterSubCat, setSelecterSubCat] = useState('');
  const handleOpen = () => setOpen(!open);
  const getSubCat = async () => {
    const response = await getSubCategory(selectedCategory);
    if (response?.status === 200) {
      setSubCategory(response?.data);
    }
  };
  const handleFile = (e) => {
    setFile(e?.target?.value);
  };
  const handleSubmited = async (values, file) => {
    console.log(values);
    let formData = new FormData();
    formData?.append('product_name', values?.product_name);
    formData?.append('descriptions', values?.descriptions);
    formData?.append('weight', values?.weight);
    formData?.append('price', values?.price);
    formData?.append('file', file);
    formData?.append('CategoryId', selectedCategory);
    formData?.append('SubCategoryId', selecterSubCat);
    const response = await addProduct(formData, tokenAdmin);
    console.log(response);
    handleOpen();
  };
  const formik = useFormik({
    initialValues: {
      product_name: '',
      descriptions: '',
      weight: 0,
      price: '',
    },
    onSubmit: (values, action) => {
      handleSubmited(values, file);
    },
  });
  useEffect(() => {
    getSubCat();
  }, [selectedCategory]);
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Add products
      </Button>
      <Dialog open={open} handler={handleOpen} size="lg">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>Add products.</DialogHeader>
          <DialogBody>
            <div className="grid grid-cols-2 gap-10">
              <Input
                label="Product Name"
                name="product_name"
                variant="static"
                value={formik.values.product_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Spicy Burger"
              />
              <Input
                label="Product Descriptions"
                name="descriptions"
                variant="static"
                alue={formik.values.descriptions}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Spicy burger with salad and beef inside"
              />
              <Input
                variant="static"
                label="Product Weight"
                alue={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="weight in ounces example: 1000 for 1kg"
                name="weight"
              />
              <Input
                variant="static"
                label="Price"
                name="price"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik?.values?.price}
              />
              <Select label="Category" onChange={(e) => setSelectedCategory(e)}>
                {category?.map((category) => (
                  <Option key={category?.id} value={category?.id}>
                    {category?.name}
                  </Option>
                ))}
              </Select>
              <Select
                label="Subcategory"
                onChange={(e) => setSelecterSubCat(e)}
              >
                {subCategory?.map((subCat) => (
                  <Option key={subCat?.id} value={subCat?.id}>
                    {subCat?.sub_category}
                  </Option>
                ))}
              </Select>
              <Input
                type="file"
                variant="static"
                label="Choose photo"
                name="file"
                onChange={(e) => handleFile(e)}
              />
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};
