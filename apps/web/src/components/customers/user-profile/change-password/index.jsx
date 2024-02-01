import { ProfileHeader } from '../profile-detail/Header';
import { FormChangePassword } from './formChangePassword';

export const ChangePasswordCustomer = () => {
  return (
    <div>
      <ProfileHeader
        title={'Change Password'}
        link={'#'}
        textLink={'Change Password'}
      />
      <FormChangePassword />
    </div>
  );
};
