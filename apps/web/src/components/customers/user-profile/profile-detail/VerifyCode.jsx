import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { verifyPhoneNumber } from '../../../../utils/customer/verify.phone.number';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
export const VerifyCode = () => {
  const [otp, setOtp] = useState('');
  const verification = useSelector((state) => state.authPhone.value);
  const token = localStorage?.getItem('token');
  const navigate = useNavigate();
  const handleVerificationOtp = async () => {
    try {
      const response = await verification.confirm(otp);
      if (response?._tokenResponse?.idToken) {
        const result = await verifyPhoneNumber(token);
        if (result?.status === 200) {
          toast.success(result?.data, {
            autoClose: 3000,
            position: 'top-right',
          });
          navigate(`/customer-dashboard/profile`);
          window.location.reload();
        }
        localStorage.removeItem('_grecaptcha');
      }
    } catch (error) {
      toast.error(`${error?.message} please request verify again`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="relative flex w-full h-[350px] max-w-[24rem] mx-auto items-center shadow-xl px-5 mt-14 rounded-md">
      <h1 className="absolute top-10 text-[24px] left-24 font-bold font-poppins">
        Verification OTP
      </h1>
      <div className="flex flex-col gap-5 py-5 mt-8 rounded-md shadow-md w-[100%] px-2">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          shouldAutoFocus={true}
          renderSeparator={<span> </span>}
          renderInput={(props) => (
            <input
              {...props}
              className="font-poppins text-[14px] text-black border-b-[1px] border-black mx-auto"
            />
          )}
        />
        <Button
          color={otp ? 'green' : 'gray'}
          disabled={otp?.length < 6}
          onClick={handleVerificationOtp}
        >
          Verify OTP
        </Button>
      </div>
    </div>
  );
};
