import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../utils/customer/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { authPhone } from '../../../../redux/auth.phone.firebase';
import { MdVerified } from 'react-icons/md';

export const ButtonVerifyPhone = ({ user }) => {
  const phone_number = user?.phone_number;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
      const confirmation = await signInWithPhoneNumber(
        auth,
        phone_number,
        recaptcha,
      );
      if (confirmation.verificationId) {
        navigate(
          `/customer-dashboard/verification-phone/${confirmation?.verificationId}`,
        );
        dispatch(authPhone(confirmation));
      } else {
        alert(confirmation.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!user.phone_number ? (
        <div className="relative">
          <button
            className="bg-gray-700/70  rounded-lg py-[6px] px-2 cursor-not-allowed text-[10px] text-main-light font-poppins"
            disabled
            color="green"
          >
            <p>Add your</p>
            <p>phone number</p>
          </button>
          <div id="recaptcha" className="absolute top-0 -right-1"></div>
        </div>
      ) : !user?.phoneVerified ? (
        <div className="relative">
          <button
            className="bg-black/90 text-white rounded-lg py-[10px] px-[15px] text-[14px]"
            onClick={sendOtp}
          >
            Verify
          </button>
          <div id="recaptcha" className="absolute top-0 -right-1"></div>
        </div>
      ) : (
        <MdVerified className='text-blue-500' size={30} />
      )}
    </>
  );
};
