import 'aos/dist/aos.css';
import { CartFunction } from '../../utils/cart/cart.function';
export const CardHome = ({ productList }) => {
  const { addToCart } = CartFunction();
  const token = localStorage.getItem('token');
  return (
    <section className="font-poppins">
      <div className="text-center px-[15%] py-5 laptop:py-5 border-t-2 laptop:mt-5 border-gray-200">
        <p
          className="font-poppins text-[20px] font-semibold"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          All product in Ez Mart Store
        </p>
      </div>
      <div className="snap-mandatory snap-x flex gap-5 overflow-x-scroll overflow-y-hidden whitespace-nowrap py-3 laptop:snap-mandatory laptop:snap-x laptop:whitespace-nowrap  laptop:flex laptop:gap-3 laptop:w-[100%] laptop:overflow-x-scroll laptop:items-center px-[3%]">
        {productList?.map((product) => (
          <div
            className="snap-center rounded-xl px-2 w-[300px] flex justify-between flex-col shadow-lg laptop:snap-center laptop:h-[400px] laptop:w-[200px] laptop:hover:scale-105 transition duration-300"
            key={product?.Product?.id}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div
              className="w-[200px] mx-auto cursor-pointer laptop:w-[100%] laptop:h-[100%]"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
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
                  <h1
                    className=" font-poppins text-black font-bold text-[14px] laptop:text-[14px]"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    {product?.Product?.product_name}
                  </h1>
                  <small
                    className="font-poppins text-main-blue laptop:text-[11px]"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    {product?.Product?.descriptions}
                  </small>
                </div>
                <h1 className="font-bold">
                  {product?.Product?.price.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </h1>
                <p className="font-poppins text-[10px] laptop:text-[12px] font-bold">
                  {product?.quantity} Stock avaible in store
                </p>
              </div>
              {product?.Product?.isDisabled === false ? (
                <button
                  disabled={!token}
                  className={`${
                    token
                      ? 'px-5 py-2 bg-main-red text-white rounded-lg text-sm font-bold'
                      : 'px-5 py-2 bg-gray-500 text-white rounded-lg text-sm font-bold cursor-not-allowed'
                  }`}
                  onClick={() => addToCart(product?.ProductId)}
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
        ))}
      </div>
    </section>
  );
};
