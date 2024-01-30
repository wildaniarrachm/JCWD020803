import { Checkout } from './checkout';

export const CheckoutList = ({ cartData }) => {
  return (
    <div className="pt-6 bg-[#F0F3F7] h-auto pb-10">
      <header className=" w-[100vw] md:w-[80vw] xl:w-[92vw] m-auto xl:flex space-y-2 xl:space-y-[9.5vh]">
        <div className="md:w-[80vw] xl:w-[61vw] ">
          <div className="hidden xl:block text-3xl font-bold text-black">
            Pengiriman
          </div>
          <section className="-mt-8 xl:mt-6 space-y-2 bg-white px-5 py-6 xl:rounded-xl shadow-lg">
            <p className="xl:font-semibold text-xs xl:text-sm text-[#6D7588]">
              ALAMAT PENGIRIMAN
            </p>
            <p className="text-sm">
              <span className="font-bold">Luthfi Al Finnegan</span> (Rumah)
            </p>
            <div className="h-6 overflow-hidden xl:w-fit xl:h-fit">
              <p>
                Kp.Karangcagak Desa.Cidahu, Kec.Pagaden Barat, Kabupaten
                Subang,41252
              </p>
            </div>
            <button className="hidden xl:block border border-[#6D7588] rounded-lg px-4 text-md text-[#6D7588] font-semibold">
              Pilih Alamat Lain
            </button>
          </section>
          {cartData.map((item) => (
            <section>
              <div className="flex bg-white pl-6 mt-2 xl:mt-4 py-10 xl:rounded-xl shadow-lg">
                <div className="flex w-full">
                  <div className="w-[17vw] h-[8vh] md:w-[12vw] md:h-[10vh] xl:w-[6.5vw] xl:h-[13vh]">
                    <img
                      src="https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/5/26/532471bc-a27e-4ac8-a79c-786b06758ffd.png.webp?ect=4g"
                      alt=""
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="relative flex flex-col w-fit h-[14vh] xl:w-[84%] ml-4 space-y-2">
                    <div className=" xl:flex justify-between">
                      <p className="text-gray-900">
                        {item.Cart_detail.Product.product_name}
                      </p>
                      <p className="font-semibold">
                        {item.Cart_detail.quantity} x{' '}
                        {item.Cart_detail.Product.price}
                      </p>
                    </div>
                    <p>80cm x 30cm 1 barang (1 kg)</p>
                    <button className="text-black border border-[#6D7588] w-[90vw] md:w-[75vw] absolute xl:static top-[10vh] -left-[21vw] md:top-[11vh] md:-left-[14vw] xl:w-full xl:px-[5vw] py-2.5 rounded-md font-semibold mt-2">
                      Pengiriman
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
        <Checkout cartData={cartData} />
      </header>
    </div>
  );
};
