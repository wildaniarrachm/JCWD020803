import { toast } from 'react-toastify';
import { CartFunction } from '../../utils/cart/cart.function';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import formatRupiah from '../../libs/formatCurrency';

export const Struk = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { cartData } = CartFunction();

  const addToShipment = () => {
    if (cartData.length > 0) {
      localStorage.setItem('cartData', JSON.stringify(cartData));
      navigate('/cart/shipment', { state: { cartData } });
    } else {
      toast.info('Input items please', { autoClose: 3000 });
    }
  };

  const handleTotalPrice = () => {
    let total = 0;
    cartData.forEach((item) => {
      total += item.Product?.price;
      setTotalPrice(total);
    });
  };

  useEffect(() => {
    handleTotalPrice();
  }, [cartData]);

  return (
    <>
      <div className="absolute rounded-lg bg-white w-full md:w-[40vw] md:h-[34vh] xl:w-[22vw] py-4 xl:h-[57vh] -bottom-[30vh] left-0 md:top-[35vh] xl:top-0 xl:left-[67vw] shadow-2xl">
        <div className=" md:w-[38vw] md:h-[30vh] xl:w-[90%] xl:h-[40vh] px-2 md:px-4 xl:px-0 m-auto md:mt-5">
          <p className="font-semibold text-xl">order summary</p>
          <section className="flex flex-col space-y-4 mt-10 pb-8 border-b border-gray.300">
            <div className="flex justify-between text-md">
              <p>Subtotal</p>
              <p>{formatRupiah(totalPrice)}</p>
            </div>
            <div className="flex justify-between text-md">
              <p>Discount</p>
              <p>0</p>
            </div>
          </section>
          <div className="flex justify-between text-lg font-semibold mt-8">
            <p>Total</p>
            <p>{formatRupiah(totalPrice)}</p>
          </div>
          <button
            onClick={addToShipment}
            className="bg-main-red hover:bg-main-blue rounded-md transition-all text-white font-bold w-full h-12 mt-5"
          >
            Process to Checkout
          </button>
        </div>
      </div>
    </>
  );
};
