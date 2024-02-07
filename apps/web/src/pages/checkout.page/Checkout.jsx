import { useEffect, useState } from 'react';
import { CheckoutList } from '../../components/checkout/checkout-list';
import { Navbar } from '../../components/navbar/Index';
import { Footer } from '../../components/footer/Index';

export const CheckoutPage = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const storedCartData = localStorage.getItem('cartData');
    if (storedCartData) {
      setCartData(JSON.parse(storedCartData));
    }
  }, []);

  return (
    <>
      <section>
        <Navbar />
        <CheckoutList cartData={cartData} />
        <Footer />
      </section>
    </>
  );
};
