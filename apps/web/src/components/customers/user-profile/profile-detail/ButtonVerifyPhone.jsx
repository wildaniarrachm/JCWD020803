import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../utils/customer/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { authPhone } from '../../../../redux/auth.phone.firebase';
import { FcApproval } from 'react-icons/fc';

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
      // console.log(confirmation);
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
      {!user?.phoneVerified ? (
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
        <button
          className="bg-green-500/50 text-white rounded-lg px-[8px] text-[14px] cursor-not-allowed"
          disabled
          color="green"
        >
          Verified
        </button>
      )}
    </>
  );
};
