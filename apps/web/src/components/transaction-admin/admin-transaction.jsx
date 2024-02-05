import axios from 'axios';
import { useEffect, useState } from 'react';

export const AdminTransaction = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/transaction/admin',
      );
      setData(response.data.response);
    } catch (err) {
      return err;
    }
  };

  const selectedId = (orderId) => {
    handleConfirmPayment(orderId);
  };

  const handleConfirmPayment = async (transactionId) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/transaction/confirm/${transactionId}`,
      );
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <section className="w-full h-screen pt-20">
        {data.map((item) => (
          <div className="border border-gray-300 rounded-lg px-5 py-7 mt-8 w-[90vw] mx-auto">
            <div className="flex items-center justify-between">
              <p> Customer : {item.Customer.username}</p>
              <button
                onClick={() => selectedId(item.id)}
                className="bg-[#00AA5B] text-white font-bold px-3 py-2 rounded-md"
              >
                Confirmation payment
              </button>
            </div>
            {item.Transaction_products.map((product) => (
              <div key={product.id}>
                <header className="flex mt-5 px-10 py-8 rounded-lg shadow-inner-more-depth">
                  <div className="w-[17vw] h-[8vh] md:w-[12vw] md:h-[10vh] xl:w-[6.5vw] xl:h-[13vh]">
                    <img
                      src="https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/5/26/532471bc-a27e-4ac8-a79c-786b06758ffd.png.webp?ect=4g"
                      alt=""
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-col w-full pl-5 space-y-4">
                    <div className=" flex justify-between">
                      <p>{product.Product.product_name}</p>
                      <p> quantity : {product.quantity}</p>
                    </div>
                    <p>{product.Product.price}</p>
                  </div>
                </header>
              </div>
            ))}
          </div>
        ))}
      </section>
    </>
  );
};
