import { Card, Typography } from '@material-tailwind/react';
import { AddToBranch } from './addToBranch';
import { useState } from 'react';
import { addIntoBranch } from '../../../../utils/product/addProduct';
import { toast } from 'react-toastify';
const TABLE_HEAD = [
  'Name',
  'Description',
  'Category',
  'Price',
  'Weight (grams)',
  '',
];

export const ProductOutside = ({ products, getOutsideProduct, getProduct }) => {
  const [openProductId, setOpenProductId] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const handleSubmit = async () => {
    const data = {
      ProductId: openProductId,
      quantity: quantity,
    };
    const response = await addIntoBranch(data, tokenAdmin);
    if (response?.status === 200) {
      toast.success(response?.data, {
        autoClose: 3000,
        position: 'top-right',
      });
      getOutsideProduct();
      getProduct();
      setQuantity(null);
    }
    handleOpen(null);
  };
  const handleOpen = (id) => {
    setOpenProductId(id === openProductId ? null : id);
  };
  return (
    <>
      <h1 className="text-center font-poppins font-bold">
        Product out of your branch
      </h1>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => {
              const isLast = index === products?.length - 1;
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50';
              return (
                <tr key={product?.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product?.product_name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product?.descriptions}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product?.Category?.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product?.price?.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      })}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-center"
                    >
                      {product?.weight}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <AddToBranch
                      product={product}
                      handleOpen={handleOpen}
                      open={openProductId === product.id}
                      quantity={quantity}
                      handleSubmit={handleSubmit}
                      setQuantity={setQuantity}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
};
