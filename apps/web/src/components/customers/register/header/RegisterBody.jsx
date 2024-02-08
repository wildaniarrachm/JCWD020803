import { FcGoogle } from 'react-icons/fc';
import { FormRegist } from '../form/FormRegist';
import { Link, useNavigate } from 'react-router-dom';
import { FormLogin } from '../../login/form';
import { auth, provider } from '../../../../utils/customer/firebase';
import { signInWithPopup } from 'firebase/auth';
import { socialRegister } from '../../../../utils/customer/add.customer';
import { useDispatch } from 'react-redux';
import { setData } from '../../../../redux/customer.slice';

export const RegisterBody = ({ title, subTitle, link, subLink }) => {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const handleLoginGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const result = await socialRegister(response?.user);
      console.log(result);
      dispacth(setData(result?.data?.isExist));
      localStorage.setItem('token', result?.data?.token);
      navigate(`/customer-dashboard/profile`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col m-auto justify-center items-center">
        <h1 className="font-poppins font-bold text-2xl">
          {title} <span className="text-main-red">Ez</span>{' '}
          <span className="text-main-pink">Mart</span>
        </h1>
        <div>
          <small className="font-poppins text-gray-600">
            {subTitle} <Link to={`/${link}`}> {subLink}</Link>
          </small>
        </div>
        <div>
          <div
            className="flex gap-5 items-center px-[30px] py-[10px] mt-[25px] border border-gray-300 cursor-pointer hover:border-gray-600 transition duration-300"
            onClick={handleLoginGoogle}
          >
            <FcGoogle size={25} />
            <p className="font-poppins text-gray-700">Sign in with google</p>
          </div>
        </div>
        <div className="flex items-center w-full justify-between p-4">
          <div className="flex-grow h-[2px] bg-gray-300 mx-4"></div>
          <div className="text-center font-poppins text-gray-600 text-sm">
            or {title} with Email
          </div>
          <div className="flex-grow h-[2px] bg-gray-300 mx-4"></div>
        </div>
        {title === 'Sign Up' ? <FormRegist /> : <FormLogin />}
      </div>
    </>
  );
};
