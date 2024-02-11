import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Navbar } from '../navbar/Index';
import { shipmentFunction } from '../../utils/transaction/shipment.function';
import { Footer } from '../footer/Index';
import { StatusOrder } from './status-order';
import { OrderFilter } from './order-filter';
import { useEffect, useState } from 'react';
import { PaymentProof } from '../../pages/payment-proof/payment-proof';
import { CancelOrder } from '../cancel-order/cancel-order';
import { RiUploadCloudLine } from 'react-icons/ri';
import { BsTrash } from 'react-icons/bs';
import formatRupiah from '../../libs/formatCurrency';

export const OrderHistory = () => {
  const {
    shipmentData,
    searchResult,
    handleResetFilters,
    handleSearchById,
    orderCancelled,
    dibatalkan,
    orderOnProcess,
    onProcess,
    waitingConfirmed,
    waitingPaymentConfirmed,
    waitingPaymentProof,
    waitingProof,
    fetchData,
    fetchByDate,
  } = shipmentFunction();

  const [status, setStatus] = useState('all');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isPaymentProofModalOpen, setIsPaymentProofModalOpen] = useState(false);
  const [isCancelOrderModalOpen, setIsCancelOrderModalOpen] = useState(false);

  const handleUploadPaymentProof = (orderId) => {
    setSelectedOrderId(orderId);
    setIsPaymentProofModalOpen(true);
  };

  const handleCancelOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setIsCancelOrderModalOpen(true);
  };

  const handleStatusClick = async (newStatus) => {
    setStatus(newStatus);
    if (newStatus === 'dibatalkan') {
      await orderCancelled();
      handleResetFilters();
    } else if (newStatus === 'menunggu pembayaran') {
      await waitingPaymentConfirmed();
      handleResetFilters();
    } else if (newStatus === 'menunggu konfirmasi') {
      await waitingPaymentConfirmed();
      handleResetFilters();
    } else if (newStatus === 'di proses') {
      await orderOnProcess();
      handleResetFilters();
    } else {
      fetchData();
      handleResetFilters();
    }
  };

  useEffect(() => {
    orderCancelled();
    waitingPaymentConfirmed();
    waitingPaymentProof();
    orderOnProcess();
    fetchData();
  }, []);

  const ordersToRender =
    searchResult.length > 0
      ? searchResult
      : status === 'semua'
        ? shipmentData
        : status === 'dibatalkan'
          ? dibatalkan
          : status === 'menunggu konfirmasi'
            ? waitingConfirmed
            : status === 'menunggu pembayaran'
              ? waitingProof
              : status === 'di proses'
                ? onProcess
                : shipmentData;

  return (
    <>
      <Navbar />
      <section className="w-full h-auto xl:py-10">
        <div>
          <div className="w-full xl:w-[90vw] mx-auto bg-white py-8 px-5 rounded-xl border-gray-200 border">
            <OrderFilter
              handleResetFilters={handleResetFilters}
              handleSearchById={handleSearchById}
              fetchByDate={fetchByDate}
            />
            <StatusOrder handleStatusClick={handleStatusClick} />
            {ordersToRender?.map((order) => (
              <div key={order.id}>
                {order?.Transaction_products?.map((product) => (
                  <div key={product.id}>
                    <section className="mt-7 xl:mt-20">
                      <div className="flex flex-col px-6 xl:mt-4 py-2 pb-3 xl:pt-4 xl:pb-10  rounded-xl xl:rounded-xl shadow-inner-more-depth gap-5">
                        <div className="flex space-x-3">
                          <p className="text-sm">
                            {moment(order.createdAt).format('LL')}
                          </p>
                          <p
                            className={
                              order.status == 'Waiting Payment Confirmation' &&
                              'Waiting Payment'
                                ? 'bg-yellow-700 px-2 rounded-lg text-sm flex items-center text-white'
                                : order.status == 'Payment Confirmed' &&
                                    'On Process'
                                  ? 'bg-blue-500  px-2 rounded-lg text-sm flex items-center text-white'
                                  : order.status == 'Order Cancelled'
                                    ? 'bg-main-red px-2 rounded-lg text-sm flex items-center text-white'
                                    : 'bg-gray-400 px-2 rounded-lg text-sm flex items-center text-white'
                            }
                          >
                            {order.status}
                          </p>
                        </div>
                        <p>
                          {
                            product.Product.Branch_products[0].Branch
                              .branch_name
                          }
                        </p>
                        <div className="flex w-full">
                          <div className="w-[17vw] h-[8vh] md:w-[12vw] md:h-[10vh] xl:w-[6.5vw] xl:h-[13vh]">
                            <img
                              src="https://images.tokopedia.net/img/cache/100-square/VqbcmM/2023/5/26/532471bc-a27e-4ac8-a79c-786b06758ffd.png.webp?ect=4g"
                              alt=""
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="relative flex flex-col w-fit h-[14vh] xl:w-[84%] ml-4 space-y-2">
                            <div
                              key={product.id}
                              className="xl:flex justify-between"
                            >
                              <p className="text-gray-900">
                                {product.Product.product_name}
                              </p>
                              <p className="font-semibold">
                                Quantity: {product.quantity}
                              </p>
                            </div>
                            <p>Courier: {order.shipment_method}</p>
                            <p>
                              {order.shipment_fee
                                ? formatRupiah(order.shipment_fee)
                                : null}
                            </p>
                            <p>{product.Product.descriptions}</p>
                            {order.status === 'Waiting Payment' && (
                              <div className="flex space-x-3 xl:space-x-5 justify-end">
                                <button
                                  onClick={() =>
                                    handleUploadPaymentProof(order.id)
                                  }
                                  className="bg-[#00AA5B] flex items-center hidden md:block justify-center h-fit md:h-10 w-[50vw] xl:px-[8vw] xl:py-2 rounded-md font-bold text-white"
                                >
                                  Upload Payment
                                </button>
                                <button
                                  onClick={() =>
                                    handleUploadPaymentProof(order.id)
                                  }
                                  className="md:hidden"
                                >
                                  <RiUploadCloudLine className="text-[6vw]" />
                                </button>
                                <button
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="bg-main-red hidden md:block md:w-[19vw] xl:h-10 xl:py-2 rounded-md font-bold text-white"
                                >
                                  Cancel Order
                                </button>
                                <button
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="md:hidden"
                                >
                                  <BsTrash className="text-main-red text-[6vw]" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {isPaymentProofModalOpen && (
        <PaymentProof
          orderId={selectedOrderId}
          onClose={() => {
            setIsPaymentProofModalOpen(false);
            setSelectedOrderId(null);
          }}
        />
      )}

      {isCancelOrderModalOpen && (
        <CancelOrder
          orderId={selectedOrderId}
          onClose={() => {
            setIsCancelOrderModalOpen(false);
            setSelectedOrderId(null);
          }}
        />
      )}

      <div className="border-t border-gray-400">
        <Footer />
      </div>
    </>
  );
};
