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
import LogoFull from '../../assets/ez-mart-high-resolution-logo-transparent.png';
import LogoIcon from '../../assets/ez-mart logo store aja.png';
import { Link, useNavigate } from 'react-router-dom';

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const listItems = [
    { name: 'Home', icon: ' ', link: '/' },
    { name: 'Shop', icon: <HiOutlineChevronRight />, link: '/' },
    { name: 'About', icon: <HiOutlineChevronRight />, link: '/' },
    { name: 'Contact', icon: <HiOutlineChevronRight />, link: '/' },
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
        className="p-4 fixed"
        size={300}
        transition={{ type: 'tween', duration: 0.5 }}
      >
        <div className="mb-6 flex items-center justify-between align-middle">
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
          {listItems?.map((item, idx) => (
            <ListItem key={idx} className="flex justify-between items-center">
              <Link to={item?.link} className="font-sans w-[90%]">
                {item.name}
              </Link>
              <Link to={item?.link} className="font-sans">
                {item.icon}
              </Link>
            </ListItem>
          ))}
        </List>
        {!token ? (
          <div className="flex gap-2 mt-5 ">
            <Button
              variant="text"
              className="hover:bg-main-red hover:text-white border-main-red border"
              onClick={() => navigate('/login-user')}
            >
              Sign In
            </Button>
            <Button
              className="bg-main-pink text-white"
              onClick={() => navigate('/register-user')}
            >
              Sign Up
            </Button>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}
