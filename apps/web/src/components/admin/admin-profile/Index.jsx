import { Avatar, Badge, Input } from '@material-tailwind/react';
import { FaUserEdit } from 'react-icons/fa';

export const AdminProfile = () => {
  console.log(apa);
  return (
    <>
      <div className="grid grid-row-3 gap-3 h-96 justify-center pl-5 w-80 shadow-lg">
        <div className="grid h-6 mt-3 ">
          <h1 className="font-poppins text-center text-lg"> My Profile </h1>
        </div>
        <div className=" flex w-80 justify-center mx-40 text-main-blue">
          <Badge
            content={<FaUserEdit size={25} />}
            color="white"
            overlap="circular"
            placement="bottom-end"
          >
            <Avatar
              size="xxl"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
              alt="profile picture"
            />
          </Badge>
        </div>
        <div className="ml-48 w-60 h-48 gap-8 grid grid-rows-4">
          <Input
            type="text"
            label="Name"
            placeholder="Admin"
            variant="static"
          />
          <Input
            type="text"
            label="Email"
            placeholder="email"
            variant="static"
          />
        </div>
      </div>
    </>
  );
};
