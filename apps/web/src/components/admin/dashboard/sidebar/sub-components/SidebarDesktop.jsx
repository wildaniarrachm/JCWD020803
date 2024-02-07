import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { Link, useLocation, useNavigation, useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { MdProductionQuantityLimits } from 'react-icons/md';

export const SideBar = ({ items }) => {
  const [activeItem, setActiveItem] = useState(0);
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  const [activeSideBar, setActiveSideBar] = useState();
  const handleSideBar = () => {
    setActiveSideBar();
  };

  return (
    <div className="grid grid-col justify-center w-[150px] text-lg text-main-blue p-3">
      <ul className="py-3">
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => handleItemClick(index)}
            className={`my-5 rounded-md font-poppins hover:bg-orange-200 ${
              activeItem === index ? 'bg-orange-300' : 'bg-transparent'
            }`}
          >
            <Link to={item.route}>
              <div className="flex justify-center"> {item.icon} </div>
              <div className="flex justify-center"> {item.name} </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
