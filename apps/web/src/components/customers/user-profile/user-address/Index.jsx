import { useDispatch } from 'react-redux';
import { getCustomerAddress } from '../../../../utils/address/get.customer.address';
import { ProfileHeader } from '../profile-detail/Header';
import { CustomerAddressBody } from './Body';
import { addressData } from '../../../../redux/customer.address.slice';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export const CustomerAddress = () => {
  const token = localStorage.getItem('token');
  const dispacth = useDispatch();
  const getAddress = async () => {
    const response = await getCustomerAddress(token);
    dispacth(addressData(response?.data?.result));
  };
  useEffect(() => {
    Aos.init({
      once: false,
      duration: 1000,
    });
  }, []);
  return (
    <div className="bg-gray-200 h-[100vh]">
      <ProfileHeader title={'My Address'} link={'#'} textLink={'Address'} />
      <div data-aos="fade-up">
        <CustomerAddressBody getAddress={getAddress} token={token} />
      </div>
    </div>
  );
};
