import { useState } from 'react';
import {
  Drawer,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
} from '@material-tailwind/react';
import { HiOutlineChevronRight, HiOutlineMenuAlt1 } from 'react-icons/hi';
import LogoFull from '../../../../assets/ez-mart-high-resolution-logo-transparent.png';
import LogoIcon from '../../../../assets/ez-mart logo store aja.png';
import { useNavigate } from 'react-router-dom';

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const listItems = [
    { name: 'Home', icon: ' ' },
    { name: 'Shop', icon: <HiOutlineChevronRight /> },
    { name: 'About', icon: <HiOutlineChevronRight /> },
    { name: 'Contact', icon: <HiOutlineChevronRight /> },
  ];

  return (
    <>
      <button
        onClick={openDrawer}
        className="bg-main-pink rounded-[25%] p-[3px]"
      >
        <HiOutlineMenuAlt1 size={35} className="text-white" />
      </button>
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="p-4"
        size={250}
        transition={{ type: 'tween', duration: 0.5 }}
      >
        <div className="mb-6 flex items-center justify-between align-middle ">
          <Typography variant="h5" color="blue-gray">
            <img src={LogoFull} alt={LogoIcon} className="w-[120px] h-[45px]" />
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <List>
          {listItems?.map((item) => (
            <ListItem key={item} className="flex justify-between items-center">
              <p className="font-sans">{item.name}</p>
              <p className="font-sans">{item.icon}</p>
            </ListItem>
          ))}
        </List>
        <div className="flex gap-2 mt-5 ">
          <Button
            variant="text"
            className="hover:bg-main-red hover:text-white border-main-red border"
            onClick={() => navigate('/home/login-user')}
          >
            Sign In
          </Button>
          <Button
            className="bg-main-pink text-white"
            onClick={() => navigate('/home/register-user')}
          >
            Sign Up
          </Button>
        </div>
      </Drawer>
    </>
  );
}
