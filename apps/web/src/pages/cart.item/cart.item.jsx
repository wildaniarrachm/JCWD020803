import { useEffect } from 'react';
import { CartFunction } from '../../utils/cart/cart.function';

export const CartItem = () => {
  const { cartData } = CartFunction();

  const totalQuantity = Array.isArray(cartData)
    ? cartData.reduce((sum, item) => sum + item.Cart_detail?.quantity, 0)
    : 0;

  useEffect(() => {}, [cartData]);

  return (
    <section className="w-fit h-fit absolute right-0 -z-50">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">
              {totalQuantity}
            </span>
          </div>
        </div>
        <div
          tabIndex={0}
          className="card card-compact dropdown-content w-[100vw] mt-6 xl:w-[35vw] shadow bg-white"
        >
          <div className="card-body">
            <span className="font-bold text-lg">{totalQuantity} Items</span>
            {cartData.map((cartItem) => (
              <div key={cartItem.id} className="flex items-center gap-x-2">
                <span className="inline-block w-[4vw] bg-cover">
                  <img
                    src="https://images.ctfassets.net/qr8kennq1pom/4HobsFfwuFnNfhL5G4TZil/bfb2aa5065e4a967e3cd1499f2c255bc/nrd-D6Tu_L3chLE-unsplash.jpg?fm=jpg&fl=progressive&q=70"
                    alt="photo"
                    className="w-full h-full object-cover"
                  />
                </span>
                <div className="flex flex-col">
                  <span className="text-info w-[22vw]">
                    {cartItem.Cart_detail?.Product.product_name}
                  </span>
                  <span className="text-xs font-thin">
                    {cartItem.Cart_detail?.quantity} item
                  </span>
                </div>
                <span className="text-info w-[5vw] flex justify-end">
                  {cartItem.Cart_detail?.Product.price.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </span>
              </div>
            ))}
            <a href="/cart">
              <div className="card-actions">
                <button className="btn bg-main-blue hover:bg-main-red text-white btn-block">
                  View cart
                </button>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
