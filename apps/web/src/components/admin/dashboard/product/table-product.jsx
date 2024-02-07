
import {
  Button,
  Card,
  IconButton,
  Tooltip,
  Typography,
} from '@material-tailwind/react';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { removeProductFromBranch } from '../../../../utils/branch-product/removed';

const TABLE_HEAD = [
  'Name',
  'Description',
  'Category',
  'Price',
  'Weight (grams)',
  'Quantity',
  '',
];

export const TableProducts = ({
  products,
  page,
  setPage,
  admin,
  getOutsideProduct,
  getProduct,
}) => {
  const handlePrev = () => {
    setPage((page -= 1));
  };
  const handleNext = () => {
    setPage((page += 1));
  };
  const handleRemoved = async (id) => {
    const response = await removeProductFromBranch(id);
    getProduct();
    getOutsideProduct();
  };
  return (
    <>
      <h1 className="text-center font-poppins font-bold">
        Product in your branch
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
            {products?.data?.map((product, index) => {
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
                      {admin?.isSuperAdmin === true
                        ? product?.product_name
                        : product?.Product?.product_name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {admin?.isSuperAdmin === true
                        ? product?.descriptions
                        : product?.Product?.descriptions}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {admin?.isSuperAdmin === true
                        ? product?.Category?.name
                        : product?.Product?.Category?.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {admin?.isSuperAdmin === true
                        ? product?.price?.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          })
                        : product?.Product?.price?.toLocaleString('id-ID', {
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
                      {admin?.isSuperAdmin === true
                        ? product?.weight
                        : product?.Product?.weight}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-center"
                    >
                      {product?.quantity}
                    </Typography>
                  </td>
                  <td className={classes}>
                    {admin?.isSuperAdmin === true ? (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        Edit
                      </Typography>
                    ) : (
                      <Tooltip content="Remove product from branch">
                        <IconButton
                          className="bg-transparent"
                          onClick={() => handleRemoved(product?.id)}
                        >
                          <IoIosRemoveCircleOutline
                            size={25}
                            className="text-red-500"
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <div className="flex justify-between font-poppins">
        <Button disabled={page <= 1} onClick={handlePrev}>
          Prev
        </Button>
        <p>
          Page {page} of {products?.totalPages}
        </p>
        <Button disabled={page >= products?.totalPages} onClick={handleNext}>
          Next
        </Button>
      </div>
    </>
  );
};
