import {
  Avatar,
  Badge,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { CustomerProfile } from './CustomerProfile';
import { useState } from 'react';
import { PiBag } from 'react-icons/pi';

export const NavbarRight = () => {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');
  return (
    <div className="flex justify-between items-center gap-[15px] tablet:gap-[40px]">
      <div className="relative top-0 flex justify-center align-middle bg-main-pink rounded-[70%] p-[20px]  tablet:relative tablet:p-[20px] laptop:p-[20px] laptop:top-0 laptop:relative">
        <Menu open={open} handler={setOpen} allowHover placement="bottom-start">
          <MenuHandler className="cursor-pointer absolute top-2 tablet:absolute tablet:top-2 laptop:absolute laptop:top-2">
            <div>
              <Badge content={'0'} withBorder>
                <PiBag size={25} color="#fff" />
              </Badge>
            </div>
          </MenuHandler>
          <MenuList className=" flex flex-col gap-2 w-[100px] max-h-[250px] tablet:max-w-[30%] laptop:max-w-[25%]">
            <MenuItem className="flex justify-around items-center gap-4 py-2 pl-2 pr-8">
              <Avatar
                variant="rounded"
                alt="tania andrew"
                src="https://media.istockphoto.com/id/1413387622/id/foto/kue-kue-dan-croissant-prancis.jpg?s=1024x1024&w=is&k=20&c=iQq4RQ5r6SLzdDr_llaB9J9oCxOApDqXRFpN-7Qf1sg="
              />
              <div className="">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-semibold font-poppins text-[12px]"
                >
                  Butter Croissant
                </Typography>
                <small className="text-[12px] font-bold text-green-500">
                  13 Item
                </small>
              </div>
            </MenuItem>
            <hr className="my-2 -mt-1" />
            <MenuItem
              className="text-center font-poppins font-bold"
              onClick={() => alert('cart page')}
            >
              Show All
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      {token ? <CustomerProfile /> : null}
    </div>
  );
};
