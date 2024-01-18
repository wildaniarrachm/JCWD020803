import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import logo from '../../../../assets/ez-mart-logo.png';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../../../libs/server.api';
import { useSelector } from 'react-redux';


export const DesktopNav = () => {
  const adminData = useSelector((state) => state.admin.value)
  console.log(adminData);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("tokenAdmin");
    navigate('/login-admin')
  }


  return (
    <>
      <div className="grid grid-cols-2 px-4 gap-4 bg-main-light pt-2 fixed z-10 items-center w-full">
        <div className="grid">
          <img src={logo} className="h-14 w-40" />
        </div>
        <div className="grid grid-cols-2 items-center">
          <div className='ml-64'>
            <Menu>
              <MenuHandler>
                <div className="flex text-main-blue align-middle">
                  <FaUserCircle size={50} />
                </div>
              </MenuHandler>
              <MenuList>
                <Link to='/admin/profile'>
                <MenuItem className="font-poppins">Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout} className="font-poppins"> Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="font-poppins">
            <Typography> Hello, {adminData?.name || 'undefined'}! </Typography> </div>
        </div>
      </div>
    </>
  );
};
