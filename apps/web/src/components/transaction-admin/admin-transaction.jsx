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

  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <section className="w-[100%] bg-[#FFB74D] rounded-lg px-6 pt-[0.5px] pb-7">
        {data.map((item) => (
          <div className="border border-gray-300 rounded-lg px-5 py-7 mt-8 mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Customer : {item.Customer.username}</p>
                <div className="w-[6vw] h-[8vw]">
                  <img
                    src={item.payment_proof}
                    alt="payment proof"
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    onClick={() => openImageInNewTab(item.payment_proof)}
                  />
                </div>
              </div>
              {item.status == 'Waiting Payment Confirmation' ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => selectedId(item.id)}
                    className="bg-[#00AA5B] hover:bg-green-500 text-white font-bold px-3 py-2 rounded-md"
                  >
                    Approve Payment
                  </button>
                  <button className="bg-main-red hover:bg-red-500 text-white font-bold px-3 py-2 rounded-md">
                    Decline Payment
                  </button>
                </div>
              ) : item.status == 'Order Cancelled' ? (
                <div className="bg-main-red hover:bg-red-500 text-white font-bold cursor-default px-3 py-2 rounded-md">
                  Order Canceled
                </div>
              ) : item.status == 'Waiting Payment' ? (
                ''
              ) : (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-md">
                  Payment Confirmed
                </button>
              )}
            </div>
            {item.Transaction_products.map((product) => (
              <div key={product.id}>
                <header className="flex-col mt-2 px-10 py-8 rounded-lg shadow-inner-more-depth bg-main-light">
                  <p className="mb-2">
                    {product.Product.Branch_products[0].Branch.branch_name}
                  </p>
                  <div className="flex">
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
