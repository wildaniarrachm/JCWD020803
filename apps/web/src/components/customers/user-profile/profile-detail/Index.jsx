import { ProfileBody } from './Body';
import { ProfileFooter } from './Footer';
import { ProfileHeader } from './Header';

export const ProfileDetail = () => {
  return (
    <div>
      <ProfileHeader title={'My Profile'} link={'#'} textLink={'Profile'} />
      <ProfileBody />
      <ProfileFooter />
    </div>
  );
};
