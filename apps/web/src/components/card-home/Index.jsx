import category_snack from '../../assets/category_snack.jpg';
import 'aos/dist/aos.css';
export const CardHome = () => {
  const items = [
    { title: 'Snack and Foods', image: category_snack, alt: 'Snack' },
    { title: 'Snack and Foods', image: category_snack, alt: 'Snack' },
    { title: 'Snack and Foods', image: category_snack, alt: 'Snack' },
    { title: 'Snack and Foods', image: category_snack, alt: 'Snack' },
    { title: 'Snack and Foods', image: category_snack, alt: 'Snack' },
    { title: 'Snack and Foods', image: category_snack, alt: 'Snack' },
    { title: 'Snack and Foods', image: category_snack, alt: 'Snack' },
    { title: 'Snack and Foods', image: category_snack, alt: 'Snack' },
  ];
  return (
    <section>
      <div className="text-center px-[15%] pt-5">
        <p
          className="font-poppins text-[25px] font-semibold"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          All product on Ez Mart Store
        </p>
      </div>
      <div className="snap-mandatory snap-x flex overflow-x-scroll overflow-y-hidden whitespace-nowrap py-3 laptop:grid grid-cols-4 laptop:overflow-x-hidden px-[3%]">
        {items?.map((item, idx) => (
          <div className="snap-center rounded-xl laptop:hover:scale-105 transition duration-300" key={idx}>
            <h1
              className="relative font-poppins text-main-blue text-[20px] left-[20%] top-8 z-10 laptop:text-[14px]"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              {item?.title}
            </h1>
            <div
              className="w-80 mx-2 flex flex-shrink-0 cursor-pointer laptop:w-[80%]"
              data-aos="fade-up"
              data-aos-duration="1000"
              onClick={() => alert(`index ke ${idx}`)}
            >
              <img
                src={item?.image}
                alt={item?.alt}
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
