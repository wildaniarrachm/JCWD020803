import { useParams } from 'react-router-dom';
import { ProfileDetail } from './profile-detail/Index';
import { CustomerAddress } from './user-address/Index';
import { ChangePasswordCustomer } from './change-password/index';
import { UserVouchers } from './profile-detail/voucher/index';
function CustomerProfile() {
  const params = useParams();
  return (
    <div>
      {params?.route === 'profile' ? (
        <ProfileDetail />
      ) : params?.route === 'address' ? (
        <CustomerAddress />
      ) : params?.route === 'change-password' ? (
        <ChangePasswordCustomer />
      ) : params?.route === 'vouchers' ? (
        <UserVouchers />
      ) : null}
    </div>
  );
}

export default CustomerProfile;
