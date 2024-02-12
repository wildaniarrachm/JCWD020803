import { Alert } from '@material-tailwind/react';
import { Footer } from '../footer/Index';
import { Navbar } from '../navbar/Index';
import { MdOutlineDeliveryDining } from 'react-icons/md';

export const Layout = ({ children, placeName }) => {
  return (
    <div className="h-[100%] bg-white">
      {placeName ? (
        <Alert
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
          variant="ghost"
          className="h-[50px] rounded-none font-poppins text-white underline text-[10px] laptop:px-[3%] laptop:text-sm bg-main-pink/80"
          icon={<MdOutlineDeliveryDining size={20} />}
        >
          <p className="text-center">{placeName}</p>
        </Alert>
      ) : null}
      <Navbar />
      <div className="mb-[5%]">{children}</div>
      <Footer />
    </div>
  );
};
