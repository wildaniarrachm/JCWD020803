import { ProfileBody } from './body';
import { ProfileFooter } from './footer';
import { ProfileHeader } from './header';

export const ProfileDetail = () => {
  return (
    <div>
      <ProfileHeader title={'My Profile'} link={'#'} textLink={'Profile'} />
      <ProfileBody />
      <ProfileFooter />
    </div>
  );
};
