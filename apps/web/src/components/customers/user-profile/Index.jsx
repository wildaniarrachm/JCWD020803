import { useParams } from 'react-router-dom';
import { ProfileDetail } from './profile-detail/Index';
import { CustomerAddress } from './user-address/Index';

export const CustomerProfile = () => {
  const params = useParams();
  return (
    <div>
      {params?.route === 'profile' ? (
        <ProfileDetail />
      ) : params?.route === 'address' ? (
        <CustomerAddress />
      ) : null}
    </div>
  );
};
