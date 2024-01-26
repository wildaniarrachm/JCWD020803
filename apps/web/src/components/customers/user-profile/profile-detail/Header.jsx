import { Link } from 'react-router-dom';
import {
  CiUser,
  CiLocationOn,
  CiSettings,
  CiLogout,
  CiShoppingCart,
} from 'react-icons/ci';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ProfileNavigation } from '../navigation';
import { useEffect } from 'react';

export const ProfileHeader = ({ title, link, textLink }) => {
  useEffect(() => {
    AOS.init({
      disable: false,
      once: false,
      duration: '2000',
    });
  });
  const items = [
    {
      icon: <CiUser size={'20px'} />,
      title: 'Profile',
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
      url: `/customer-dashboard/`,
    },
    {
      icon: <CiShoppingCart size={'20px'} />,
      title: 'Go Shopping',
      url: `/`,
    },
  ];
  return (
    <section className="bg-gray-200 h-[435px]">
      <ProfileNavigation title={title} link={link} textLink={textLink} />
      <div
        className="bg-white h-[250px] mt-[90px] mx-2 rounded-md shadow-lg"
        data-aos="fade-right"
      >
        <div>
          {items?.map((item, idx) => (
            <div key={idx} className="flex gap-2 py-1">
              <Link
                to={item?.url}
                className="flex font-poppins items-center gap-2 py-[15px] pl-5  focus:bg-main-light focus:text-main-red w-[100%] transition duration-500"
              >
                <p className="inline-block" data-aos="fade-right">
                  {item.icon}
                </p>
                <p className="inline-block" data-aos="fade-right">
                  {item.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
