import { Breadcrumbs } from '@material-tailwind/react';

export const RegisterHeader = () => {
  return (
    <div className="h-[250px] flex flex-col m-auto justify-center items-center">
      <p className="font-poppins font-bold text-[40px]">Register Now</p>
      <div>
        <Breadcrumbs className="bg-white ">
          <a href="/home" className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>
          <a href="/home/register-user" className="text-gray-600">
            Register
          </a>
        </Breadcrumbs>
      </div>
    </div>
  );
};
