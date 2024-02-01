import { DrawerAddress } from './Drawer';
import { CgPin, CgChevronDown } from 'react-icons/cg';

export const DeliverLocation = ({ deliveried, closeDrawer, openDrawer, open }) => {
  return (
    <>
      {deliveried?.length > 0 ? (
        <>
          <div
            onClick={openDrawer}
            className="laptop:hidden cursor-pointer flex items-center gap-2 py-3 w-[50%]"
          >
            <CgPin className="animate-bounce text-blue-700" size={20} />
            {deliveried?.map((primaryAddress) => (
              <h1
                className="text-gray-600 font-poppins text-[14px]"
                key={primaryAddress?.id}
              >
                Deliver to{' '}
                <span className=" font-poppins font-bold text-black">{`${primaryAddress?.label_address} ${primaryAddress?.received_name}`}</span>
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
    </>
  );
};
