import 'aos/dist/aos.css';
import { CartFunction } from '../../utils/cart/cart.function';
import formatRupiah from '../../libs/formatCurrency';
import { CardPlacehoderSkeleton } from './skeleton';
import { toast } from 'react-toastify';

export const CardHome = ({ productList }) => {
  const { addToCart } = CartFunction();
  const token = localStorage.getItem('token')
  
  const handleCart = (productId, BranchId) => {
    if (!token) {
      return toast.warn('Please login first or create a new account', {
        autoClose: 3000,
        position: 'top-right',
      });
    } else {
      addToCart(productId, BranchId);
    }
  };
  return (
    <section className="font-poppins">
      <div className="text-center px-[15%] pt-5">
        <p
          className="font-poppins text-[25px] font-semibold"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          All product in Ez Mart Store
        </p>
      </div>
      <div className="snap-mandatory snap-x flex gap-5 overflow-x-scroll overflow-y-hidden whitespace-nowrap py-3 laptop:grid laptop:grid-cols-6 laptop:overflow-x-hidden px-[3%]">
        {productList?.map((product) =>
          product ? (
            <div
              className="snap-center rounded-xl px-2 w-[300px] flex justify-between flex-col shadow-lg laptop:h-[400px] laptop:w-[200px] laptop:cursor-pointer laptop:hover:scale-105 transition duration-300"
              key={product?.Product?.id}
            >
              <div className="w-[200px] mx-auto cursor-pointer laptop:w-[100%] laptop:h-[100%]">
                {product?.Product?.Product_images?.map((images) => (
                  <img
                    key={images?.id}
                    src={images?.product_image}
                    className="object-fill rounded-xl"
                  />
                ))}
              </div>
              <div className="flex flex-col gap-7 pb-2">
                <div className="flex flex-col py-2 gap-5 laptop:w-[200px]">
                  <div className="w-[90%]">
                    <h1 className=" font-poppins text-black font-bold text-[14px] laptop:text-[14px]">
                      {product?.Product?.product_name}
                    </h1>
                    <small className="font-poppins text-main-blue laptop:text-[11px]">
                      {product?.Product?.descriptions}
                    </small>
                  </div>
                  <h1 className="font-bold">
                    {formatRupiah(product?.Product?.price)}
                  </h1>
                  <p className="font-poppins text-[10px] laptop:text-[12px] font-bold">
                    {product?.quantity} Stock avaible in store
                  </p>
                </div>
                {product?.Product?.isDisabled === false ? (
                  <button
                    className="px-5 py-2 bg-main-red text-white rounded-lg text-sm font-bold cursor-pointer"
                    onClick={() =>
                      handleCart(product?.ProductId, product?.BranchId)
                    }
                  >
                    +Basket
                  </button>
                ) : (
                  <button
                    className="px-5 py-2 bg-gray-500 cursor-not-allowed text-white rounded-lg text-sm font-bold"
                    disabled
                    onClick={() => alert(`index ke`)}
                  >
                    Not avaible
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div key={product?.id} className="grid grid-cols-6">
              <CardPlacehoderSkeleton />
            </div>
          ),
        )}
      </div>
    </section>
  );
};
