import { AddAddress } from './AddAddress';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { switchPrimaryAddress } from '../../../../utils/address/switch.primary';
import { deleteAddress } from '../../../../utils/address/delete.address';
import { DetailAddress } from './DetailAddress';
import { switchDeliveriedAddress } from '../../../../utils/address/switch.delivery';
import { recoverAddress } from '../../../../utils/address/recover.address';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { searchAddress } from '../../../../utils/address/search.address';
export const CustomerAddressBody = ({ getAddress, token }) => {
  const [search, setSearch] = useState('');
  const navigation = [
    { id: 1, name: 'All Address', key: false },
    { id: 2, name: 'Recently Deleted', key: true },
  ];
  const [filter, setFilter] = useState({
    filter: false,
    active: 1,
  });
  const address = useSelector((state) => state.customerAddress.value);
  const handlePrimary = async (checked, id) => {
    await switchPrimaryAddress(checked, id, token);
    getAddress();
  };
  const handleRecover = async (id) => {
    const response = await recoverAddress(id);
    if (response?.status === 200) {
      toast.success(response?.data, {
        autoClose: 5000,
      });
    }
    getAddress();
  };
  const handleDeleted = async (id) => {
    const wilDeleted = await swal({
      title: 'Are you sure?',
      text: 'Dont worry, once deleted, you will be able to recover this address.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });

    if (wilDeleted) {
      try {
        const response = await deleteAddress(id);
        swal(response?.data, {
          icon: 'success',
        });
      } catch (error) {
        swal(error?.message, {
          icon: 'error',
        });
      }
    } else {
      swal('Your address is safe!');
    }
    getAddress();
  };

  const filteredAddress = address?.filter(
    (address) => address?.isDeleted === filter?.filter,
  );
  const handleDeliveried = async (data) => {
    await switchDeliveriedAddress(data, token);
    getAddress();
  };
  const handleSearch = async () => {
    const response = await searchAddress(search, token);
  };
  return (
    <section className="bg-gray-200 p-2">
      <h2 className="font-bold text-[20px] font-poppins text-center mb-2">
        Address List
      </h2>
      <div className=" h-full py-2 px-3 rounded-lg bg-white flex flex-col gap-5">
        <div className="w-full">
          <div className="flex justify-between w-full p-1 laptop:p-5">
            <div className="w-[30%] flex flex-col gap-4 tablet:w-[60%] laptop:w-[40%]">
              {/* <div className="flex flex-col tablet:flex-row gap-2">
                <Input
                  label="Search recived name or address"
                  className="w-[220px] laptop:w-[100%]"
                  onChange={(e) => setSearch(e?.target?.value)}
                  value={search}
                />
                <Button size="sm" onClick={handleSearch}>
                  Search
                </Button>
              </div> */}
              <div className="flex gap-2">
                {navigation?.map((nav) => (
                  <button
                    className={`border text-[10px] laptop:text-[14px] border-gray-400 text-gray-600 px-8 py-1 tablet:px-6 tablet:py-5 rounded-lg ${
                      filter?.active === nav?.id
                        ? 'bg-main-pink/50 border-main-red text-main-red'
                        : null
                    }`}
                    key={nav?.id}
                    onClick={() =>
                      setFilter({ filter: nav?.key, active: nav?.id })
                    }
                  >
                    {nav?.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-[30%] tablet:w-[20%] laptop:w-[20%]">
              <AddAddress getAddress={getAddress} />
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-2">
            <DetailAddress
              filteredAddress={filteredAddress}
              handleDeleted={handleDeleted}
              handlePrimary={handlePrimary}
              handleDeliveried={handleDeliveried}
              handleRecover={handleRecover}
              getAddress={getAddress}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
