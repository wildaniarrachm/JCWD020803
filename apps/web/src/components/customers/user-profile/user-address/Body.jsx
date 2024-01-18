import { HiOutlineHome } from 'react-icons/hi2';
export const CustomerAddressBody = () => {
  return (
    <section className="h-[300px] bg-gray-200 py-6">
      <div className="h-[100%] bg-white mx-2 rounded-lg shadow-lg">
        <div className="flex flex-col p-5">
          <div className='flex flex-col justify-center'>
            <HiOutlineHome size={'60px'} className="text-main-red/80" />
            <h1 className='font-poppins font-bold text-[24px]'>Home Address</h1>
          </div>
        </div>
      </div>
    </section>
  );
};
