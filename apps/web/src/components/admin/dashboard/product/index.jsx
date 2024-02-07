import { TableProducts } from './table-product';
import { AddProducts } from './add-product';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../../../utils/product/getProduct';
import { getAllCategory } from '../../../../utils/categories/getCategories';
import { useSelector } from 'react-redux';
import { ProductOutside } from './productOutinBranch';
import { getProductOutsideBranch } from '../../../../utils/product/getOutsideBranch';

export const ProductManagement = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState({ data: [], totalPages: '' });
  const [category, setCategory] = useState();
  const [outSide, setOutSide] = useState();
  const admin = useSelector((state) => state.admin.value);
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const getCategory = async () => {
    const response = await getAllCategory();
    if (response?.status === 200) {
      setCategory(response?.data);
    }
  };
  const getProduct = async () => {
    const response = await getAllProducts(page, tokenAdmin);
    if (response?.status === 200) {
      setProducts({
        data: response?.data?.result,
        totalPages: response?.data?.totalPages,
      });
    }
  };
  const getOutsideProduct = async () => {
    const response = await getProductOutsideBranch(tokenAdmin);
    console.log(response);
    if (response?.status === 200) {
      setOutSide(response?.data);
    }
  };
  useEffect(() => {
    getProduct();
  }, [page]);
  useEffect(() => {
    getCategory();
    getOutsideProduct();
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        {admin?.isSuperAdmin === true ? (
          <AddProducts category={category} />
        ) : null}
      </div>
      <TableProducts
        products={products}
        setPage={setPage}
        page={page}
        admin={admin}
        getOutsideProduct={getOutsideProduct}
        getProduct={getProduct}
      />
      {admin?.isSuperAdmin === false ? (
        <ProductOutside
          products={outSide}
          getOutsideProduct={getOutsideProduct}
          getProduct={getProduct}
        />
      ) : null}
    </div>
  );
};
