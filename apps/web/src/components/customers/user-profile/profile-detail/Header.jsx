import { Link, useLocation } from 'react-router-dom';
import {
  CiUser,
  CiLocationOn,
  CiSettings,
  CiShoppingCart,
} from 'react-icons/ci';
import { ProfileNavigation } from '../Navigation';
export const ProfileHeader = ({ title, link, textLink }) => {
  const items = [
    {
      icon: <CiUser size={'20px'} />,
      title: 'Personal Information',
      url: `/customer-dashboard/profile/`,
    },
    {
      icon: <CiLocationOn size={'20px'} />,
      title: 'Address',
      url: `/customer-dashboard/address/`,
    },
    {
      icon: <CiSettings size={'20px'} />,
      title: 'Change Password',
      url: `/customer-dashboard/change-password`,
    },
    {
      icon: <CiShoppingCart size={'20px'} />,
      title: 'Cart',
      url: `/cart/shipment`,
    },
  ];
  const { pathname } = useLocation();
  return (
    <section className="bg-gray-200 h-[435px]">
      <ProfileNavigation title={title} link={link} textLink={textLink} />
      <div className="bg-white h-[250px] mt-[90px] mx-2 rounded-md shadow-lg">
        <div>
          {items?.map((item) => (
            <div key={item} className="relative flex gap-2 py-1">
              <span
                className={`${
                  pathname === item?.url
                    ? 'absolute h-[90%] rounded-lg w-0.5 bg-main-red'
                    : 'hidden'
                }`}
              ></span>
              <Link
                to={item?.url}
                className={`flex font-poppins items-center gap-2 py-[15px] pl-5 ${
                  pathname === item?.url
                    ? 'bg-main-light text-main-red'
                    : 'text-gray-500'
                } w-[100%] transition duration-500`}
              >
                <p className="inline-block">{item.icon}</p>
                <p className="inline-block ">{item.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
