import { CartFunction } from '../../utils/cart/cart.function';
import { useNavigate } from 'react-router-dom';

export const Struk = () => {
  const navigate = useNavigate();
  const { cartData } = CartFunction();

  const addToShipment = async () => {
    try {
      if (cartData.length > 0) {
        localStorage.setItem('cartData', JSON.stringify(cartData));
        navigate('/cart/shipment', { state: { cartData } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const totalPrice = cartData.reduce(
    (sum, item) => sum + item.Cart_detail.Product.price,
    0,
  );

  return (
    <>
      <div className="absolute rounded-lg bg-white w-full md:w-[40vw] md:h-[34vh] xl:w-[22vw] py-4 xl:h-[57vh] -bottom-[30vh] left-0 md:top-[35vh] xl:top-0 xl:left-[67vw] shadow-2xl">
        <div className=" md:w-[38vw] md:h-[30vh] xl:w-[90%] xl:h-[40vh] px-2 md:px-4 xl:px-0 m-auto md:mt-5">
          <p className="font-semibold text-xl">order summary</p>
          <section className="flex flex-col space-y-4 mt-10 pb-8 border-b border-gray.300">
            <div className="flex justify-between text-md">
              <p>Subtotal</p>
              <p>Rp.{totalPrice}</p>
            </div>
            <div className="flex justify-between text-md">
              <p>Discount</p>
              <p>0</p>
            </div>
          </section>
          <div className="flex justify-between text-lg font-semibold mt-8">
            <p>Total</p>
            <p>Rp.{totalPrice}</p>
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
