import Logo from '../../../../assets/ez-mart-nav-logo.png';
import { HamburgerMenu } from '../../../landing-page/mobile-view/navbar/HamburgerMenu';
import { useState } from 'react';
import { ProfileMenu } from './admin-menu';
export const AdminNavbarMobile = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="flex justify-between align-middle bg-main-red text-main-light z-20 h-[70px] p-[3%] sticky top-0
     "
    >
      <div className="flex align-middle relative">
        <div>
          <HamburgerMenu />
        </div>
        <div className="absolute top-[5px] left-[55px] w-[150px]">
          <img src={Logo} className="object-fit w-[100px] h-[40px] " />
        </div>
      </div>
      <div className="flex justify-center rounded-[50%]">
        <ProfileMenu />
      </div>
    </div>
  );
};
