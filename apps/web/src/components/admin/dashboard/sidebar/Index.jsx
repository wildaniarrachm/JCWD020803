import { MdProductionQuantityLimits, MdOutlineInventory } from 'react-icons/md';
import { TbCategoryPlus } from 'react-icons/tb';
import { IoPeople } from 'react-icons/io5';
import { LuListPlus } from 'react-icons/lu';
import { AiOutlineStock } from 'react-icons/ai';
import { SideBar } from '../sidebar/sub-components/SidebarDesktop';
import { IoStorefrontOutline } from 'react-icons/io5';

export const Sidebar = () => {
  const items = [
    {
      name: 'Product',
      icon: <MdProductionQuantityLimits size={'25px'} />,
      route: '/dashboard/products',
    },
    { name: 'Sales Report', icon: <AiOutlineStock size={'25px'} /> },
    {
      name: 'Inventory',
      icon: <MdOutlineInventory size={'30px'} />,
      route: '/inventory',
    },
    {
      name: 'Admin',
      icon: <IoPeople size={'30px'} />,
      route: '/admin-management',
    },
    {
      name: 'Branch',
      icon: <IoStorefrontOutline size={'30px'} />,
      route: '/dashboard/branch',
    },
    {
      name: 'Category',
      icon: <TbCategoryPlus size={'30px'} />,
      route: '/category',
    },
    {
      name: 'Subcategory',
      icon: <LuListPlus size={'30px'} />,
      route: '/subcategory',
    },
  ];

  return (
    <div className="flex h-screen z-10 fixed">
      <SideBar items={items} />
    </div>
  );
};
