import { Carousel, IconButton } from '@material-tailwind/react';
import imageCarousel_1 from '../../assets/carousel_1.jpg';
import imageCarousel_5 from '../../assets/carousel_5.jpg';
import imageCarousel_4 from '../../assets/carousel_4.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg';
import { StoreLocation } from './storeLocation';
import { DeliverLocation } from './deliverLocation';

export const MainCarousel = ({ deliveried, branch }) => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    });
  });
  const items = [
    {
      img: imageCarousel_1,
      alt: 'Image 1',
    },
    {
      img: imageCarousel_4,
      alt: 'Image 4',
    },
    {
      img: imageCarousel_5,
      alt: 'Image 4',
    },
  ];
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <div className="px-3 laptop:pr-[6%] laptop:pl-[3%] flex flex-col-reverse justify-center gap-2">
      <Carousel
        className="h-[200px] rounded-lg laptop:h-[270px] laptop:w-[100%] bg-main-red laptop:rounded-lg"
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
      {deliveried?.length >= 1 ? (
        <div className="flex justify-between items-center">
          <DeliverLocation
            closeDrawer={closeDrawer}
            openDrawer={openDrawer}
            deliveried={deliveried}
            open={open}
          />
          <span className="w-0.5 ml-1 h-10 bg-gray-400 laptop:hidden"></span>
          <StoreLocation deliveried={deliveried} branch={branch} />
        </div>
      ) : (
        <div>
          <StoreLocation deliveried={deliveried} branch={branch} />
        </div>
      )}
    </div>
  );
};
