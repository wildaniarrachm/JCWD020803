import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import React from 'react';
import { useFetchProducts } from '../../utils/cart/add.cart';
import { CartFunction } from '../../utils/cart/cart.function';

export const Product = () => {
  const products = useFetchProducts();
  const { addToCart } = CartFunction();

  return (
    <>
      <div className="bg-blue-200">
        <header className=" w-full flex justify-center pt-10">
          <p className="bg-white px-3 py-1 rounded-3xl text-2xl font-bold text-blue-900">
            Product List
          </p>
        </header>
        <div className=" grid grid-cols-4 pl-5 gap-y-10 py-10">
          {products.map((product) => (
            <Card key={product.id} className="w-72">
              <CardHeader shadow={false} floated={false} className="h-[40vh]">
                <img
                  src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography color="blue-gray" className="font-medium">
                    {product.product_name}
                  </Typography>
                  <Typography color="blue-gray" className="font-medium">
                    Rp.{product.price}
                  </Typography>
                </div>
                {product.Branch_products.map((branchProduct) => (
                  <p className="text-black">
                    {branchProduct.quantity <= 0
                      ? 'Stock Habis'
                      : `Stock: ${branchProduct.quantity}`}
                  </p>
                ))}
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75"
                >
                  With plenty of talk and listen time, voice-activated Siri
                  access, and an available wireless charging case.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  onClick={() => addToCart(product.id)}
                  ripple={false}
                  fullWidth={true}
                  className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
