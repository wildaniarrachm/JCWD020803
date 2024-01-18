import { Link, useParams } from 'react-router-dom';
import { CiUser, CiLocationOn, CiSettings, CiLogout } from 'react-icons/ci';
import 'aos/dist/aos.css';
import { ProfileNavigation } from '../Navigation';
export const ProfileHeader = ({ title, link, textLink }) => {
  const { username } = useParams();
  const items = [
    {
      icon: <CiUser size={'20px'} />,
      title: 'Profile',
      url: `/customer-dashboard/profile/${username}`,
    },
    {
      icon: <CiLocationOn size={'20px'} />,
      title: 'Address',
      url: `/customer-dashboard/address/${username}`,
    },
    {
      icon: <CiSettings size={'20px'} />,
      title: 'Change Password',
      url: `/customer-dashboard/`,
    },
    {
      icon: <CiLogout size={'20px'} />,
      title: 'Sign Out',
      url: `/customer-dashboard/`,
    },
  ];
  return (
    <section className="bg-gray-200 h-[435px]">
      <ProfileNavigation title={title} link={link} textLink={textLink} />
      <div
        className="bg-white h-[250px] mt-[90px] mx-2 rounded-md shadow-lg"
        data-aos="fade-right"
        data-aos-duration="1000"
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
