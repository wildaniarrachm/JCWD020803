import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Switch,
} from '@material-tailwind/react';
import { useState } from 'react';
import { FcCheckmark } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { deletePermanentAddress } from '../../../../utils/address/delete.address';

export const DetailAddress = ({
  filteredAddress,
  handleDeleted,
  handlePrimary,
  handleDeliveried,
  handleRecover,
  getAddress,
}) => {
  const handleDeletePermanent = async (id) => {
    const wilDeleted = await swal({
      title: 'Are you sure want to delete permanent?',
      text: 'Once deleted, you will not be able to recover this address!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });

    if (wilDeleted) {
      try {
        const response = await deletePermanentAddress(id);
        if (response?.status === 200) {
          swal(response?.data, {
            icon: 'success',
          });
          getAddress();
        }
      } catch (error) {
        swal(error?.message, {
          icon: 'error',
        });
      }
    } else {
      swal('Your address is safe!');
    }
  };
  return (
    <>
      {filteredAddress?.length > 0 ? (
        filteredAddress?.map((address) => (
          <div
            key={address?.id}
            className={`h-[100%] laptop:h-[100%] mx-2 laptop:mx-6 w-[90%] laptop:w-[60%] border border-gray-400 rounded-lg cursor-pointer transition duration-300 ${
              address?.isDeliveried === true
                ? 'bg-main-pink/20 border-main-red'
                : 'bg-white'
            }`}
          >
            <div className="flex gap-[50px] justify-between pr-8 items-center ">
              <div className="flex gap-2 m-2 items-center">
                <h2 className="font-poppins font-bold text-gray-700 text-sm laptop:text-normal">
                  {address?.label_address}
                </h2>
                {address?.primary_address === true ? (
                  <h2 className="bg-blue-500 text-white font-poppins font-bold px-2 rounded-md">
                    Primary
                  </h2>
                ) : null}
              </div>
              {address?.isDeleted === false ? (
                address?.isDeliveried === true ? (
                  <FcCheckmark size={25} />
                ) : (
                  <button
                    className="bg-main-blue/80 text-white text-[10px]  px-1 rounded-md py-0.5 laptop:text-sm font-poppins"
                    onClick={() => handleDeliveried(address?.id)}
                  >
                    Use this address
                  </button>
                )
              ) : null}
            </div>

            <div className="flex flex-col w-[20%] gap-2 m-2">
              <h2 className="font-poppins text-start font-bold text-black text-[18px]">
                {address?.received_name}
              </h2>
              <h2 className=" text-black text-start font-poppins -mt-1 text-[18px]">
                {address?.phone_number}
              </h2>
              <small className="font-poppins text-[14px] inline-block w-[300px] laptop:w-[500px]">
                {address?.street}
              </small>
            </div>
            <div className="flex justify-between items-center w-full pr-3">
              <div className="flex gap-2 m-2">
                {address?.isDeleted === false ? (
                  <Link
                    to={`/customer-dashboard/address/${address?.id}`}
                    className={`font-poppins font-bold ${
                      address?.isDeliveried === true
                        ? 'text-main-blue'
                        : 'text-main-pink'
                    }`}
                  >
                    Edit
                  </Link>
                ) : (
                  <button
                    className="text-main-red font-poppins font-bold"
                    onClick={() => handleDeletePermanent(address?.id)}
                  >
                    Delete permanent
                  </button>
                )}
                <span className="h-[22px] border border-gray-500"></span>
                {address?.isDeleted === false ? (
                  <button
                    disabled={address?.isDeliveried === true}
                    className={`text-main-red ${
                      address?.isDeliveried === true
                        ? 'cursor-not-allowed text-main-red/50'
                        : null
                    } font-poppins font-bold px-2 rounded-md `}
                    onClick={() => handleDeleted(address?.id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className={`text-green-500 font-poppins font-bold px-2 rounded-md`}
                    onClick={() => handleRecover(address?.id)}
                  >
                    Recover
                  </button>
                )}
              </div>
              <div>
                {address?.isDeleted === false ? (
                  <Switch
                    color="blue"
                    checked={address?.primary_address === true}
                    disabled={address?.primary_address === true}
                    label={
                      address?.primary_address === true
                        ? 'Primary'
                        : 'Set as primary'
                    }
                    onChange={(e) =>
                      handlePrimary(e?.target?.checked, address?.id)
                    }
                  />
                ) : null}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-[200px] text-gray-500 laptop:px-5">
          <h1>Empty item</h1>
        </div>
      )}
    </>
  );
};
