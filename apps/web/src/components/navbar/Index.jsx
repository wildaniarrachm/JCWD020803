import Logo from '../../assets/ez-mart-high-resolution-logo-transparent.png';
import { HamburgerMenu } from './HamburgerMenu';
import { Link } from 'react-router-dom';
import { NavbarRight } from './NavbarRight';
import { NavbarNav } from './NavbarNav';
export const Navbar = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="flex justify-between border border-b-gray-200 align-middle text-main-blue h-[70px] laptop:h-[95px] p-[3%] sticky top-0 z-20 laptop:pl-[5%] latpop:pr-[10%] bg-white transition duration-300">
      <div className="flex align-middle relative">
        <div className="absolute top-0 tablet:absolute tablet:top-0 laptop:hidden">
          <HamburgerMenu />
        </div>
        <Link
          to={'/'}
          className="absolute cursor-pointer top-0 left-[55px] w-[150px] tablet:top-0 laptop:-top-5 laptop:left-0"
        >
          <img
            src={Logo}
            className=" object-fit w-[110px] h-[40px] laptop:w-[150px] laptop:h-[55px]"
          />
        </Link>
      </div>
      <div className="hidden laptop:flex">
        <NavbarNav />
      </div>
      {!token ? (
        <div className="hidden laptop:flex gap-5 laptop:absolute right-32 top-6 font-poppins">
          <Link
            to={'/login-user'}
            className="px-5 py-1 rounded-md border border-main-red text-main-red"
          >
            login
          </Link>
          <Link
            to={'/register-user'}
            className="px-3 py-1 rounded-md border bg-main-red text-main-light"
          >
            Register
          </Link>
        </div>
      ) : null}
      <NavbarRight />
    </div>
  );
};
