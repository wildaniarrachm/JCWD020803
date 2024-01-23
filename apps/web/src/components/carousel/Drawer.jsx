import { Drawer, IconButton, Typography } from '@material-tailwind/react';
import { FaChevronCircleRight } from 'react-icons/fa';
import { FcCheckmark } from 'react-icons/fc';
import { Link } from 'react-router-dom';

export const DrawerAddress = ({ open, closeDrawer, deliveried }) => {
  return (
    <Drawer
      open={open}
      onClose={closeDrawer}
      className="p-4"
      placement="bottom"
    >
      <div className="mb-6 flex justify-between font-poppins">
        <div>
          <Typography variant="h5" color="blue-gray">
            Where do you want to send it?
          </Typography>
          <small color="gray" className="text-[11px] text-gray-600">
            To make your shopping experience better, choose an address first.
          </small>
        </div>
        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      {deliveried?.map((deliveried) => (
        <div
          key={deliveried?.id}
          className="flex justify-between gap-2 font-poppins"
        >
          <div className="h-[150px] w-[60%] flex flex-col p-2 gap-2 border border-main-red/70 shadow-lg rounded-lg">
            <div className="flex gap-2 justify-between pr-3">
              <div className='flex gap-3'>
                <h1 className="font-bold">{deliveried?.received_name}</h1>
                {deliveried?.primary_address === true ? (
                  <small className="bg-gray-500 rounded-md px-2 text-white py-0.5 font-bold text-[10px]">
                    Primary
                  </small>
                ) : null}
              </div>
              <FcCheckmark size={20} />
            </div>
            <h2 className="text-gray-500">{deliveried?.phone_number}</h2>
            <div className="overflow-hidden ">
              <h2 className="text-gray-700 text-[12px]">
                {deliveried?.street}
              </h2>
            </div>
          </div>
          <Link
            to={'customer-dashboard/address'}
            className="h-[150px] flex flex-col gap-3 justify-center items-center w-[30%] shadow-lg border border-main-red/70 rounded-lg"
          >
            <FaChevronCircleRight className="text-main-pink" size={30} />
            <p className="text-[12px] text-center text-main-pink font-bold font-poppins">
              Select a different address
            </p>
          </Link>
        </div>
      ))}
    </Drawer>
  );
};
