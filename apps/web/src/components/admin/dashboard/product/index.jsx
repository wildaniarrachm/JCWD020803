import { TableProducts } from './table-product';
import { AddProducts } from './add-product';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../../../utils/product/getProduct';
import { getAllCategory } from '../../../../utils/categories/getCategories';

export const ProductManagement = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState({ data: [], totalPages: '' });
  const [category, setCategory] = useState();
  const getCategory = async () => {
    const response = await getAllCategory();
    if (response?.status === 200) {
      setCategory(response?.data);
    }
  };
  console.log(category);
  const getProduct = async () => {
    const response = await getAllProducts(page);
    if (response?.status === 200) {
      setProducts({
        data: response?.data?.result,
        totalPages: response?.data?.totalPages,
      });
    }
  };
  useEffect(() => {
    getProduct();
  }, [page]);
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <AddProducts category={category} />
      </div>
      <TableProducts products={products} setPage={setPage} page={page} />
    </div>
  );
};
