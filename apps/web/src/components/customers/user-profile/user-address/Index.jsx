import { ProfileHeader } from '../profile-detail/Header';
import { CustomerAddressBody } from './Body';

export const CustomerAddress = () => {
  return (
    <div className='bg-gray-200 h-[100vh]'>
      <ProfileHeader title={'My Address'} link={'#'} textLink={'Address'} />
      <CustomerAddressBody/>
    </div>
  );
};
