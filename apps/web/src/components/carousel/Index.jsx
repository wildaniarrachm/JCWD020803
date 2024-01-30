import {
  Carousel,
  Typography,
  IconButton,
  Drawer,
} from '@material-tailwind/react';
import imageCarousel_1 from '../../assets/carousel_1.jpg';
import imageCarousel_5 from '../../assets/carousel_5.jpg';
import imageCarousel_6 from '../../assets/carousel_6.jpg';
import imageCarousel_3 from '../../assets/carousel_3.jpg';
import imageCarousel_4 from '../../assets/carousel_4.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { CgPin, CgChevronDown } from 'react-icons/cg';
import { FaChevronCircleRight } from 'react-icons/fa';
import { FcCheckmark } from 'react-icons/fc';
import { DrawerAddress } from './Drawer';

export const MainCarousel = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    });
  });
  const items = [
    {
      img: imageCarousel_6,
      alt: 'Image 1',
      title: 'Discount Up to 50% all items',
      subTitle:
        "Great News! Enjoy a 50% discount on all products. Don't miss out on these incredible savings. Shop now and indulge in the best deals!",
      button: 'Shop Now',
    },
    // {
    //   img: imageCarousel_3,
    //   alt: 'Image 2',
    //   title: 'Discount 20%',
    //   subTitle:
    //     'Enjoy a 20% discount on all pet foods! Treat your furry friends to quality meals at a great price.',
    //   button: 'Shop Now',
    // },
    {
      img: imageCarousel_4,
      alt: 'Image 4',
      title: 'Discount 10%',
      subTitle:
        "Happy Friday! Today's special offer is just for you. Get an exclusive discount on all black-colored products. Elevate your style with our sleek and sophisticated items at a discounted price. Treat yourself this Friday and shop now!",
      button: 'Shop Now',
    },
    {
      img: imageCarousel_5,
      alt: 'Image 4',
      title: 'Discount 10%',
      subTitle:
        "Happy Friday! Today's special offer is just for you. Get an exclusive discount on all black-colored products. Elevate your style with our sleek and sophisticated items at a discounted price. Treat yourself this Friday and shop now!",
      button: 'Shop Now',
    },
  ];
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [deliveried, setDeliveried] = useState();

  const address = useSelector((state) => state.customerAddress.value);
  const handleDeliveried = () => {
    if (address?.length > 0) {
      const deliveried = address?.filter(
        (deliveried) => deliveried?.isDeliveried === true,
      );
      if (deliveried?.length > 0) {
        return setDeliveried(deliveried);
      } else {
        const primaryAddress = address?.filter(
          (primary) => primary?.primary_address === true,
        );
        return setDeliveried(primaryAddress);
      }
    }
  };
  useEffect(() => {
    handleDeliveried();
  }, [address]);
  return (
    <div className="px-3 laptop:pr-[6%] laptop:pl-[3%] flex flex-col-reverse justify-center gap-2">
      <Carousel
        className="h-[200px] rounded-lg laptop:h-[270px] laptop:my-[3%] laptop:w-[100%] bg-main-red laptop:rounded-lg"
        autoplay
        loop
        autoplayDelay={5000}
        data-aos="fade-right"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill('').map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="black"
            size="md"
            onClick={handlePrev}
            className="!absolute z-10 top-2/4 left-2 -translate-y-2/4 bg-gray-100/50 rounded-full text-bold hover:bg-white"
          >
            <CgChevronLeft size={25} />
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="black"
            size="md"
            onClick={handleNext}
            className="!absolute z-10 top-2/4 right-2 -translate-y-2/4 bg-gray-100/50 rounded-full text-bold hover:bg-white"
          >
            <CgChevronRight size={25} />
          </IconButton>
        )}
      >
        {items?.map((item, idx) => (
          <div className="relative h-[100%] w-[100%] " key={idx}>
            <img
              src={item?.img}
              alt={item?.alt}
              className="h-full w-full object-fill"
            />
          </div>
        ))}
      </Carousel>
      {deliveried?.length > 0 ? (
        <>
          <div
            onClick={openDrawer}
            className="laptop:hidden cursor-pointer flex items-center gap-2 py-3 w-[60%]"
          >
            <CgPin className="animate-bounce text-blue-700" size={15} />
            {deliveried?.map((primaryAddress) => (
              <h1
                className="text-gray-600 font-poppins text-[14px]"
                key={primaryAddress?.id}
              >
                Deliver to{' '}
                <span className="font-poppins font-bold text-black">{`${primaryAddress?.label_address} ${primaryAddress?.received_name}`}</span>
              </h1>
            ))}
            <CgChevronDown />
          </div>
          <DrawerAddress
            open={open}
            closeDrawer={closeDrawer}
            deliveried={deliveried}
          />
        </>
      ) : null}
    </div>
  );
};
