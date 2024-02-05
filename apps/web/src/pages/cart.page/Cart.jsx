import React from 'react';
import { ProductListCheckout } from '../../components/cart/product-list-checkout';
import { Coupon } from '../../components/cart/coupon';
import { Struk } from '../../components/cart/struk';
import { Navbar } from '../../components/navbar/Index';
import { Footer } from '../../components/footer';
import { IoArrowBack } from 'react-icons/io5';

export const Cart = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div className="w-[88.5vw] m-auto">
        <header className="font-semibold text-2xl mt-10 xl:mt-7">
          <a
            href="/"
            className="font-normal text-sm flex items-center gap-3 mb-3"
          >
            {' '}
            <IoArrowBack />
            Add item
          </a>
          <p>Shopping Cart</p>
        </header>
        <section className="relative w-full h-auto pb-20">
          <ProductListCheckout />
          <Coupon />
          <Struk fetchCartData={() => fetchData()} />
        </section>
      </div>
      <div className="mt-[40vh] md:mt-[28vh] xl:mt-[0]">
        <Footer />
      </div>
    </>
  );
};
