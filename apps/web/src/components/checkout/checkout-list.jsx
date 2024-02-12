import { useNavigate } from 'react-router-dom';
import { Checkout } from './checkout';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Option, Select } from '@material-tailwind/react';
import { shippingCost } from '../../utils/transaction/shipping.cost';
import formatRupiah from '../../libs/formatCurrency';

export const CheckoutList = ({ cartData }) => {
  const deliveried = useSelector((state) => state.delivery.value);
  const [finalCost, setFinalCost] = useState({ method: '', cost: [] });
  const couriers = [
    {
      name: 'JNE',
      value: 'jne',
    },
    {
      name: 'TIKI',
      value: 'tiki',
    },
    {
      name: 'POS',
      value: 'pos',
    },
  ];
  const [services, setServices] = useState({
    data: [],
    disable: true,
  });
  const [shipmenValue, setShipmenValue] = useState({
    weight: null,
    destination: '',
    origin: '',
    courier: '',
  });
  const handleCost = (e) => {
    setFinalCost({ method: e?.description, cost: e?.cost });
    t;
  };

  const navigate = useNavigate();
  const handleShipmentValue = (e) => {
    setShipmenValue({
      weight: cartData[0]?.Product?.weight,
      destination: cartData[0]?.Product?.Branch_products[0]?.Branch?.city_id,
      origin: deliveried[0]?.City?.city_id,
      courier: e,
    });
  };
  const handleShippingCost = async () => {
    if (shipmenValue?.courier) {
      const response = await shippingCost(shipmenValue);
      if (response?.data?.rajaongkir?.status?.code === 200) {
        setServices({
          data: response?.data?.rajaongkir?.results[0]?.costs,
          disable: false,
        });
      }
    }
  };
  useEffect(() => {
    handleShippingCost();
  }, [shipmenValue?.courier]);
  return (
    <div className="pt-6 bg-[#F0F3F7] h-auto pb-10">
      <header className=" w-[100vw] md:w-[80vw] xl:w-[92vw] m-auto xl:flex space-y-2 xl:space-y-[9.5vh]">
        <div className="md:w-[80vw] xl:w-[61vw] ">
          <div className="hidden xl:block text-3xl font-bold text-black">
            Shipping
          </div>
          {deliveried?.length >= 1 ? (
            deliveried?.map((delivery) => (
              <section
                className="-mt-8 xl:mt-6 space-y-2 bg-white px-5 py-6 xl:rounded-xl shadow-lg font-poppins"
                key={delivery?.id}
              >
                <p className="xl:font-semibold text-xs xl:text-sm text-[#6D7588]">
                  SHIPPING ADDRESS
                </p>
                <p className="text-sm">
                  Nama Penerima:
                  <span className="font-bold">
                    {' '}
                    {delivery?.received_name}
                  </span>{' '}
                  ({delivery?.label_address})
                </p>
                <p className="text-sm">Contact: {delivery?.phone_number}</p>
                <div className="h-6 overflow-hidden xl:w-fit xl:h-fit">
                  <p>
                    {delivery?.street}, {delivery?.City?.city},{' '}
                    {delivery?.City?.Province?.province}
                  </p>
                </div>
                <button
                  className="hidden xl:block border border-[#6D7588] rounded-lg px-4 text-md text-[#6D7588] font-semibold"
                  onClick={() => navigate('/customer-dashboard/address')}
                >
                  {deliveried ? 'Choose another address' : 'Add address'}
                </button>
              </section>
            ))
          ) : (
            <section className="-mt-8 xl:mt-6 space-y-2 bg-white px-5 py-6 xl:rounded-xl shadow-lg">
              <p className="xl:font-semibold text-xs xl:text-sm text-[#6D7588]">
                SHIPPING ADDRESS
              </p>
              <p className="text-sm">
                <span className="font-bold">you don't have an address yet</span>
              </p>
              <div className="h-6 overflow-hidden xl:w-fit xl:h-fit">
                <p>Choose another address</p>
              </div>
              <button
                className="hidden xl:block border border-[#6D7588] rounded-lg px-4 text-md text-[#6D7588] font-semibold"
                onClick={() => navigate('/customer-dashboard/address')}
              >
                add address
              </button>
            </section>
          )}
          {cartData.map((item) => (
            <section key={item?.id}>
              <div className="flex-col bg-white pl-6 mt-2 xl:mt-4 pt-4 pb-14 xl:rounded-xl shadow-lg">
                <p className="font-bold">Served by Ez Mart</p>
                <p className="pb-3">
                  {item.Product.Branch_products[0].Branch.branch_name}
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
                    <div className=" xl:flex justify-between">
                      <p className="text-gray-900">
                        {item.Product.product_name}
                      </p>
                      <p className="font-semibold">
                        {item?.quantity} x{' '}
                        {item.Product.price.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        })}
                      </p>
                    </div>
                    <p>80cm x 30cm 1 barang (1 kg)</p>
                  </div>
                </div>
              </div>
            </section>
          ))}
          <div className="mt-4 py-5 px-2 rounded-xl shadow-2xl space-y-3 font-poppins bg-white">
            <p>Choose Couriers</p>
            <div className="flex flex-col justify-between laptop:flex laptop:gap-2 ">
              <Select
                label="Choose courier"
                onChange={(e) => handleShipmentValue(e)}
              >
                {couriers?.map((couriers) => (
                  <Option key={couriers?.value} value={couriers?.value}>
                    {couriers?.name}
                  </Option>
                ))}
              </Select>
              <Select
                label="Choose services..."
                disabled={services?.disable === true}
                onChange={(e) => handleCost(e)}
              >
                {services?.data?.map((service) => (
                  <Option key={service?.service} value={service}>
                    <div className="pr-10">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold mb-2 text-sm">
                            {`${shipmenValue?.courier.toUpperCase()} ${
                              service?.service
                            }`}
                          </p>
                          <p>{service?.description}</p>
                        </div>
                        {service?.cost?.map((costs) => (
                          <div key={costs}>
                            <p className="font-bold">
                              {formatRupiah(costs?.value)}
                            </p>
                            <p>Estimasi : {costs?.etd} hari</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <Checkout
          cartData={cartData}
          deliveried={deliveried}
          finalCost={finalCost}
          shipmenValue={shipmenValue?.courier}
        />
      </header>
    </div>
  );
};
