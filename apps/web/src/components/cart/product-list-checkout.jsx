import { BsTrash } from 'react-icons/bs';
import cartImg from '../../assets/shopping-cart.png';
import { useEffect, useState } from 'react';
import { CartFunction } from '../../utils/cart/cart.function';

export const ProductListCheckout = () => {
  const { cartData, handleDeleteItem, handleQuantityChange } = CartFunction();
  const [cartItemsExist, setCartItemsExist] = useState(true);
  useEffect(() => {
    setCartItemsExist(cartData.length > 0);
  }, [cartData]);

  return (
    <div>
      <div className=" w-[100%]  xl:w-[73%] py-3 flex px-7 bg-main-red text-white mt-[4rem] rounded-md font-semibold text-sm">
        <div className="w-[24vw] md:w-[35.9vw] xl:w-[30vw]">Product</div>
        <div className="w-[23vw] md:w-[19vw] xl:w-[11.5vw]">Price</div>
        <div>Quantity</div>
      </div>
      {cartItemsExist ? (
        cartData.map((cartItem) => (
          <div key={cartItem.id} className="w-full xl:w-[73%] h-auto">
            <div className="w-full h-[15vh] xl:h-[25vh] flex items-center border-gray-200 border-b-[1.5px]">
              <div className="w-14 h-12 md:w-[13vw] md:h-[10vh] xl:w-20 xl:h-20 flex">
                <img
                  src="https://images.ctfassets.net/qr8kennq1pom/4HobsFfwuFnNfhL5G4TZil/bfb2aa5065e4a967e3cd1499f2c255bc/nrd-D6Tu_L3chLE-unsplash.jpg?fm=jpg&fl=progressive&q=70"
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="ml-1 md:ml-6 xl:ml-6 w-[24vw] md:w-[23.5vw] xl:w-[24vw] h-fit">
                {cartItem.Cart_detail.Product.product_name}
              </p>
              <p className="w-[19vw] md:w-[16vw] xl:w-[10vw] mr-2">
                Rp.{cartItem.Cart_detail.Product.price}
              </p>
              <div className="flex justify-center cursor-pointer space-x-4 px-2 w-[18vw] h-[3vh] md:w-[13vw] xl:w-[7vw] xl:h-[5vh] items-center rounded-full bg-gray-200 ml-2">
                <div
                  className="pb-1 xl:pb-0 font-semibold"
                  onClick={() =>
                    handleQuantityChange(
                      cartItem.Cart_detail.id,
                      cartItem.Cart_detail.quantity - 1,
                      'decrement',
                    )
                  }
                >
                  -
                </div>
                <div>{cartItem.Cart_detail.quantity}</div>
                <div
                  className="pb-0 font-semibold"
                  onClick={() =>
                    handleQuantityChange(
                      cartItem.Cart_detail.id,
                      cartItem.Cart_detail.quantity + 1,
                      'increment',
                    )
                  }
                >
                  +
                </div>
              </div>
              <button
                onClick={() => handleDeleteItem(cartItem.Cart_detail.id)}
                className="mr-4 ml-4 md:ml-[7.5vw] xl:ml-[7vw] cursor-pointer hover:text-main-red transition-all"
              >
                <BsTrash className="text-[1.5rem]" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className=" h-[10vh] md:h-[15vh] xl:w-[62.7vw] xl:h-[28vh]">
          <img
            src={cartImg}
            alt="Shopping Cart"
            className="w-full h-full object-contain pt-5 xl:pt-10"
          />
        </div>
      )}
    </div>
  );
};
