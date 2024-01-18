import { Link } from 'react-router-dom';

export const NavbarNav = () => {
  const items = [
    { name: 'Home', link: '/' },
    { name: 'Shop', link: '/' },
    { name: 'About', link: '/' },
    { name: 'Contact', link: '/' },
  ];
  return (
    <div className="tablet:hidden flex gap-5">
      {items?.map((item, idx) => (
        <Link
          to={item?.link}
          key={idx}
          className="font-poppins text-main-light relative group text-[20px]"
        >
          <span>{item?.name}</span>
          <span className="absolute bottom-0 left-0 w-0 bg-main-light h-0 group-hover:h-[3px] group-hover:w-full rounded-lg transition-all duration-300"></span>
        </Link>
      ))}
    </div>
  );
};
