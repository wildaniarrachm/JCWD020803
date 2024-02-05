import { useEffect, useState } from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { getCustomerVouchers } from '../../../../../utils/customer-vouchers/getCustomerVoucher';
import { useNavigate } from 'react-router-dom';

export const HeaderVouchers = () => {
  const [activeTab, setActiveTab] = useState(' ');
  const [vouchers, setVouchers] = useState();
  const user = useSelector((state) => state.customer.value);
  const navigate = useNavigate();
  const getVoucher = async () => {
    const response = await getCustomerVouchers(user?.id, activeTab);
    if (response?.status === 200) {
      setVouchers(response?.data);
    }
  };
  useEffect(() => {
    getVoucher();
  }, [activeTab, []]);
  const data = [
    {
      label: 'All',
      value: ' ',
    },
    {
      label: 'Coupons New Member',
      value: '1',
    },
    {
      label: 'Coupons Referral',
      value: '2',
    },
  ];
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 "
        indicatorProps={{
          className:
            'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none',
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={
              activeTab === value
                ? 'text-gray-900 font-poppins'
                : 'font-poppins'
            }
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value }) => (
          <TabPanel key={value} value={value}>
            {vouchers?.map((item) => (
              <div
                onClick={() =>
                  navigate(
                    `/customer-dashboard/vouchers/detail/${item?.Voucher?.voucher_code}`,
                  )
                }
                key={item?.id}
                className="flex relative  my-5 gap-10 font-poppins bg-main-red shadow-xl shadow-gray-200 h-[150px] w-[300px] rounded-xl cursor-pointer"
              >
                <span className="absolute -right-1 -top-1 text-main-blue font-bold text-[20px] h-10 w-10 bg-white text-center rounded-full border-2 border-main-red">
                  {item?.vouchers_amount}x
                </span>
                <span className="absolute bg-gray-100 h-[30px] w-10 rounded-[50%] -left-5 top-[40%]"></span>
                <span className="absolute bg-gray-100 h-[30px] w-10 rounded-[50%] -right-5 top-[40%]"></span>
                <div className="w-full h-full flex flex-col items-center justify-between py-3">
                  <h1 className="font-bold text-red-100">
                    {item?.Voucher?.voucher_name}
                  </h1>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-around text-red-100">
                      <p>Start</p>
                      <p>End</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-red-100 font-bold">
                        {new Date(item?.Voucher.start_date).toLocaleString(
                          'GMT',
                          {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          },
                        )}
                      </p>
                      <span>-</span>
                      <p className="text-red-100 font-bold">
                        {new Date(item?.Voucher.end_date).toLocaleString(
                          'GMT',
                          {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          },
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="text-red-100">
                    Minimum Spent :{' '}
                    {item?.Voucher?.minimum_spent.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};
