import { FcGoogle } from 'react-icons/fc';
import { FormRegist } from '../form/FormRegist';
import { Link } from 'react-router-dom';
export const RegisterBody = () => {
  return (
    <div className="flex flex-col m-auto justify-center items-center">
      <h1 className="font-poppins font-bold text-2xl">
        Sign Up <span className="text-main-red">Ez</span>{' '}
        <span className="text-main-pink">Mart</span>
      </h1>
      <div>
        <small className="font-poppins text-gray-600">
          Already have an account?{' '}
          <Link to={'/home/login-user'}> Sign in</Link>
        </small>
      </div>
      <div>
        <div
          className="flex gap-5 items-center px-[30px] py-[10px] mt-[25px] border border-gray-300 cursor-pointer hover:border-gray-600 transition duration-300"
          onClick={() => alert('login google')}
        >
          <FcGoogle size={25} />
          <p className="font-poppins text-gray-700">Sign in with google</p>
        </div>
      </div>
      <div className="flex items-center w-full justify-between p-4">
        <div className="flex-grow h-[2px] bg-gray-300 mx-4"></div>
        <div className="text-center font-poppins text-gray-600 text-sm">
          or Sign Up with Email
        </div>
        <div className="flex-grow h-[2px] bg-gray-300 mx-4"></div>
      </div>
      <FormRegist />
    </div>
  );
};
