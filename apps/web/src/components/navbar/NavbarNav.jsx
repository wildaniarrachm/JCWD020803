import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from '@material-tailwind/react';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { CgPin, CgChevronDown } from 'react-icons/cg';
import { DeliveriedLocation } from './DeliveriedLocation';

export const NavbarNav = () => {
  const inputRef = useRef();
  const items = [
    { name: 'Food and Cookies', link: '' },
    { name: 'Food and Cookies', link: '' },
    { name: 'Food and Cookies', link: '' },
  ];
  const [deliveried, setDeliveried] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
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
    <div className="hidden laptop:flex laptop:items-center laptop:absolute laptop:left-[20%] laptop:top-6 laptop:w-[60%] laptop:gap-5">
      <div className="relative w-[80%] bg-blue-gray-200">
        <div className="absolute w-[80%]">
          <Input label="Search on Ez Mart" ref={inputRef} />
        </div>
        <div className="absolute top-10 flex gap-4">
          {items?.map((items, idx) => (
            <div key={idx}>
              <Link
                to={items?.link}
                className="font-poppins text-sm text-gray-600 hover:text-main-red"
              >
                {items?.name}
              </Link>
            </div>
          ))}
        </div>
        <div
          className="absolute py-1.5 px-4 -top-0.5 bg-gray-50 left-[82%] text-gray-700 cursor-pointer hover:bg-gray-200 rounded-lg"
          onClick={() => alert(inputRef?.current?.value)}
        >
          <CiSearch size={30} />
        </div>
        <div className="absolute left-[100%] top-2 w-[35%]">
          {deliveried?.length > 0 ? (
            <>
              <div
                onClick={handleOpen}
                className="cursor-pointer flex items-center gap-2"
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
              <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="justify-between">
                  <div>
                    <Typography variant="h5" color="blue-gray">
                      Where do you want to send it?
                    </Typography>
                    <Typography color="gray" variant="paragraph">
                      To make your shopping experience better, choose an address
                      first.
                    </Typography>
                  </div>
                </DialogHeader>
                <DialogBody>
                  <DeliveriedLocation deliveried={deliveried} />
                </DialogBody>
                <DialogFooter>
                  <button
                    className="font-bold font-poppins rounded-lg border border-green-500 px-5 py-2 text-green-500 hover:text-white hover:border-green-500 hover:border hover:bg-green-500/80 focus:border focus:border-green-500"
                    onClick={handleOpen}
                  >
                    Use this location
                  </button>
                </DialogFooter>
              </Dialog>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
