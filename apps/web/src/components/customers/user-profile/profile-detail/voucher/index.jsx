import { ProfileHeader } from '../header';
import { HeaderVouchers } from './header';

export const UserVouchers = () => {
  return (
    <div className="bg-gray-200 h-[100vh]">
      <ProfileHeader title={'My Vouchers'} textLink={'Vouchers'} link={'#'} />
      <div className="flex flex-col bg-white px-5 mx-2 rounded-lg">
        <HeaderVouchers />
      </div>
    </div>
  );
};
