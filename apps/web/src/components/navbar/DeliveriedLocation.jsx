import { CgPin } from 'react-icons/cg';
import { FcCheckmark } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

export const DeliveriedLocation = ({ deliveried }) => {
  const navigate = useNavigate();
  return (
    <>
      {deliveried?.map((deliveried) => (
        <div
          className="h-[300px] w-full flex flex-col justify-center gap-3"
          key={deliveried?.id}
        >
          <div className="h-[60%] border border-main-red/60 bg-main-pink/10 rounded-lg p-[2%] font-poppins">
            <div className="flex flex-col">
              <div className="flex justify-between items-center pr-5">
                <h1 className="font-bold text-black">
                  {deliveried?.label_address}{' '}
                  {deliveried?.primary_address === true ? (
                    <span className="bg-gray-500 text-white py-0.5 px-2 rounded-md text-sm">
                      Primary
                    </span>
                  ) : null}
                </h1>
                <FcCheckmark size={23} />
              </div>
              <h2 className="font-bold text-black">
                {deliveried?.received_name}
              </h2>
              <p className="text-black text-md">{deliveried?.phone_number}</p>
              <p className="text-[14px]">{deliveried?.street}</p>
              <div className="flex items-center gap-1 mt-2">
                <CgPin />
                {deliveried?.longitude == ' ' ? (
                  <small>Not ready pin point</small>
                ) : (
                  <small>Already pin point</small>
                )}
              </div>
            </div>
          </div>
          <div
            onClick={() => navigate('/customer-dashboard/address')}
            className="font-poppins h-[14%] w-full border border-main-red rounded-lg flex justify-center items-center cursor-pointer focus:border-main-red"
          >
            <p className="font-bold text-main-red text-[14px]">
              Select a different address
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
