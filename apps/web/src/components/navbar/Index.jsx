import Logo from '../../assets/ez-mart-nav-logo.png';
import { HamburgerMenu } from './HamburgerMenu';
import { Link } from 'react-router-dom';
import { NavbarRight } from './NavbarRight';
import { NavbarNav } from './NavbarNav';
export const Navbar = () => {
  return (
    <div className="flex justify-between align-middle bg-gradient-to-b from-main-red to-main-pink text-main-light h-[70px] p-[3%] sticky top-0 z-20 laptop:pl-[5%] latpop:pr-[10%]">
      <div className="flex align-middle relative">
        <div className="tablet: absolute tablet:-top-1 laptop:hidden">
          <HamburgerMenu />
        </div>
        <Link
          to={'/'}
          className="absolute cursor-pointer top-[5px] left-[55px] w-[150px] tablet:top-0 laptop:-top-5 laptop:left-0"
        >
          <img src={Logo} className="object-fit w-[100px] h-[40px] " />
        </Link>
      </div>
      {/* <div className="laptop:block laptop:absolute laptop:left-[40%] laptop:top-6 mobile:hidden">
        <NavbarNav />
      </div> */}
      <NavbarRight />
    </div>
  );
};
