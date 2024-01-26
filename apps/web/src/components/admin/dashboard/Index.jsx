import { DesktopNav } from './nav/Index';
import { Sidebar } from './sidebar/Index';

export const Layout = ({ children }) => {
  return (
    <>
      <div className=" grid gap-6 grid-rows-[75px_minmax(900px,_1fr)] grid-cols-[150px_minmax(900px,_1fr)]">
        <div className="row-span-2 z-30 h-full bg-main-light">
          <Sidebar />
        </div>
        <div className="bg-main-light z-10">
          {' '}
          <DesktopNav />{' '}
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};
