import { FaCircleChevronUp } from 'react-icons/fa6';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
export const ButtonScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 100);
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`sticky bottom-5 right-10 flex justify-end w-[100%] transition-transform duration-300 pr-5 tablet:sticky tablet:bottom-20 ${
        isVisible ? 'transform scale-100 animate-bounce' : 'transform scale-0'
      }`}
      onClick={handleClick}
    >
      <FaCircleChevronUp
        size={'40px'}
        className="hover:scale-110 transition duration-300 text-main-light/80 cursor-pointer"
      />
    </div>
  );
};
