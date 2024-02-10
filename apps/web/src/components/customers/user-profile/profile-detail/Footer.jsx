import { CiDiscount1 } from 'react-icons/ci';
import { MdFavoriteBorder, MdOutlineHistory } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const ProfileFooter = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      disable: false,
      once: false,
      duration: '2000',
    });
  }, []);
  const items = [
    {
      icon: <CiDiscount1 size={'30%'} />,
      title: 'My Vouchers',
      route: '/customer-dashboard/vouchers',
    },
    {
      icon: <MdFavoriteBorder size={'30%'} />,
      title: 'Favourites',
      // route: 'favourites',
    },
    {
      icon: <MdOutlineHistory size={'30%'} />,
      title: 'Order History',
      route: '/customer-dashboard/profile/order-history',
    },
  ];
  return (
    <section className="h-[100%] pb-5 bg-gray-200">
      <div className="h-[70%] bg-white mx-2 rounded-lg shadow-lg py-5 tablet:grid tablet:grid-cols-3 tablet:gap-2 tablet:px-4">
        {items?.map((item, idx) => (
          <div
            className="my-3 h-[30%] w-[80%] border mx-auto hover:bg-main-pink/10 hover:text-main-pink transition duration-300 tablet:w-[100%] tablet:h-[80%] cursor-pointer"
            key={idx}
            onClick={() => navigate(item?.route)}
          >
            <div
              className="flex flex-col items-center justify-center h-[100%]"
              data-aos="fade-up"
            >
              {item?.icon}
              <h3 className="font-poppins">{item?.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
