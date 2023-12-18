import { Navbar } from './navbar/Navbar';

export const MobilePage = ({children}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
