import { useParams } from 'react-router-dom';
import { getVoucherByCode } from '../../../../../utils/vouchers/getVoucherCode';
import { ProfileHeader } from '../Header';
import { useEffect, useState } from 'react';
import { Typography, Button, Tooltip } from '@material-tailwind/react';
import { useCopyToClipboard } from 'usehooks-ts';
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

export const DetailVouchers = () => {
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const { code } = useParams();
  const [details, setDetails] = useState();
  console.log(code);
  const getVoucher = async () => {
    const response = await getVoucherByCode(code);
    if (response?.status === 200) {
      setDetails(response?.data);
    }
  };
  console.log(details);
  useEffect(() => {
    getVoucher();
  }, []);
  return (
    <div className="h-full pb-5 bg-gray-200">
      <ProfileHeader
        link={'/customer-dashboard/vouchers'}
        textLink={'Back'}
        title={'Details Voucher'}
      />
      <div className="mx-2 bg-white rounded-lg font-poppins">
        <div className="text-center py-2">
          <h1 className="font-bold text-[26px]">Details Voucher</h1>
        </div>
        {details?.map((item) => (
          <div className="pl-[3%] py-3 grid grid-cols-2 " key={item?.id}>
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-lg">Voucher Name : </h1>
              <p>{item?.voucher_name}</p>
              <h1 className="font-bold text-lg">Descriptions : </h1>
              <p>{item?.description}</p>
              <h1 className="font-bold text-lg">Nominal Discount : </h1>
              <p>
                {item?.nominal?.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </p>
              <h1 className="font-bold text-lg">Minimum Spent : </h1>
              <p>
                {item?.minimum_spent?.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </p>
              <h1 className="font-bold text-lg">Maximum Discount : </h1>
              <p>
                {item?.maximum_discount?.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </p>
              {console.log(item)}
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <h1 className='font-bold'>Voucher Code : </h1>
                <Tooltip
                  content={copied ? 'Copied' : 'Copy'}
                  placement="bottom"
                >
                  <Button
                    size="sm"
                    onMouseLeave={() => setCopied(false)}
                    onClick={() => {
                      copy(item?.voucher_code);
                      setCopied(true);
                    }}
                    className="flex items-center gap-x-3 hover:shadow-none bg-white text-black  shadow-none uppercase"
                  >
                    <Typography
                      className="border-r border-gray-400/50 pr-3 text-black text-[14px] font-poppins"
                    >
                      {item?.voucher_code}
                    </Typography>
                    {copied ? (
                      <CheckIcon className="h-4 w-4 text-black" />
                    ) : (
                      <DocumentDuplicateIcon className="h-4 w-4 text-black" />
                    )}
                  </Button>
                </Tooltip>
              </div>
              <h1 className="font-bold">Start Date :</h1>
              <p>
                {' '}
                {new Date(item?.start_date).toLocaleString('GMT', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <h1 className="font-bold">End Date :</h1>
              <p>
                {' '}
                {new Date(item?.end_date).toLocaleString('GMT', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <h1 className="font-bold">Type :</h1>
              <p>{item?.voucher_type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
