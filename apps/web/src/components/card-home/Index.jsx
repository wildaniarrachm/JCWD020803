import 'aos/dist/aos.css';
export const CardHome = ({ productList }) => {
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
      <div className="snap-mandatory snap-x flex overflow-x-scroll overflow-y-hidden whitespace-nowrap py-3 laptop:grid grid-cols-6 laptop:overflow-x-hidden laptop:border-b-2 laptop:border-gray-200 laptop:pb-5 px-[3%]">
        {productList?.map((product) => (
          <div
            className="snap-center rounded-xl cursor-pointer px-2 w-[300px] flex justify-between flex-col shadow-lg laptop:h-[380px] laptop:w-[200px] laptop:hover:scale-105 transition duration-300"
            key={product?.Product?.id}
          >
            <div
              className="w-[200px] mx-auto cursor-pointer laptop:w-[100%] laptop:h-[90%]"
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
              <div className="flex flex-col py-2 gap-5">
                <div>
                  <h1
                    className=" font-poppins text-black font-bold text-[20px] laptop:text-[14px]"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    {product?.Product?.product_name}
                  </h1>
                  <small
                    className="font-poppins text-main-blue"
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
              </div>
              {token ? (
                product?.Product?.isDisabled === false ? (
                  <button
                    className="px-5 py-2 bg-main-red text-white rounded-lg text-sm font-bold"
                    onClick={() =>
                      alert(
                        `branch id: ${product?.BranchId} product id : ${product?.ProductId}`,
                      )
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
                )
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
