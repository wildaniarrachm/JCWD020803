import { AdminTable } from '../../components/admin/dashboard/admin-management/admintable';
import { DesktopNav } from '../../components/admin/dashboard/nav/Index';
import { Sidebar } from '../../components/admin/dashboard/sidebar/Index';
// import { SideBarReal } from '../../components/admin/dashboard/sidebar/sidebar';

export const ManageProduct = () => {
  return (
    <>
      <div className=" grid gap-6 grid-rows-[75px_minmax(900px,_1fr)] grid-cols-[150px_minmax(900px,_1fr)]">
        <div className="row-span-2 z-30 h-full bg-main-light">
          <Sidebar />
        </div>
        <div className="bg-main-light z-10"> <DesktopNav/> </div>
        <div className=" bg-main-light rounded-lg p-10">
          <AdminTable />
        </div>
      </div>
    </>
  );
};
