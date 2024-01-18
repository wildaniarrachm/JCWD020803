import { Carousel, Typography, Button } from '@material-tailwind/react';
import imageCarousel_1 from '../../assets/carousel_1.jpg';
import imageCarousel_2 from '../../assets/carousel_2.jpg';
import imageCarousel_3 from '../../assets/carousel_3.png';
import imageCarousel_4 from '../../assets/carousel_4.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export const MainCarousel = () => {
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
      title: 'Discount Up to 50% all items',
      subTitle:
        "Great News! Enjoy a 50% discount on all products. Don't miss out on these incredible savings. Shop now and indulge in the best deals!",
      button: 'Shop Now',
    },
    {
      img: imageCarousel_3,
      alt: 'Image 2',
      title: 'Discount 20%',
      subTitle:
        'Enjoy a 20% discount on all pet foods! Treat your furry friends to quality meals at a great price.',
      button: 'Shop Now',
    },
    {
      img: imageCarousel_4,
      alt: 'Image 4',
      title: 'Discount 10%',
      subTitle:
        "Happy Friday! Today's special offer is just for you. Get an exclusive discount on all black-colored products. Elevate your style with our sleek and sophisticated items at a discounted price. Treat yourself this Friday and shop now!",
      button: 'Shop Now',
    },
  ];
  return (
    <Carousel
      className="h-[600px]"
      autoplay
      loop
      autoplayDelay={3000}
      data-aos="fade-right"
    >
      {items?.map((item, idx) => (
        <div className="relative h-full w-full " key={idx}>
          <img
            src={item?.img}
            alt={item?.alt}
            className="h-full w-full object-fit"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 md:w-2/4">
              <Typography
                variant="h1"
                color="white"
                className="font-poppins mb-4 text-2xl md:text-4xl lg:text-5xl"
              >
                {item?.title}
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="font-poppins text-lg mb-12 opacity-80"
              >
                {item?.subTitle}
              </Typography>
              <div className="flex justify-start gap-2">
                <Button size="lg" className="bg-main-red">
                  {item?.button}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};
