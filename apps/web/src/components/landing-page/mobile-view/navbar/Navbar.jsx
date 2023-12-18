import Logo from '../../../../assets/ez-mart-nav-logo.png';
import { PiBag } from 'react-icons/pi';
import { HamburgerMenu } from './HamburgerMenu';
import {
  Avatar,
  Badge,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { useState } from 'react';
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="flex justify-between align-middle bg-main-red text-main-light h-[70px] p-[3%] sticky top-0
     "
    >
      <div className="flex align-middle relative">
        <div>
          <HamburgerMenu />
        </div>
        <div className="absolute top-[5px] left-[55px] w-[150px]">
          <img src={Logo} className="object-fit w-[100px] h-[40px] " />
        </div>
      </div>
      <div className="flex justify-center align-middle bg-main-pink rounded-[50%] p-[10px]">
        <Menu open={open} handler={setOpen} allowHover>
          <MenuHandler className="cursor-pointer">
            <div>
              <Badge content={'0'} withBorder>
                <PiBag size={25} color="#fff" />
              </Badge>
            </div>
          </MenuHandler>
          <MenuList className="flex flex-col gap-2 w-[75%] max-h-[100px]">
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
    </div>
  );
};
