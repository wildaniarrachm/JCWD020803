import { Footer } from '../footer/index';
import { Navbar } from '../navbar/Index';

export const Layout = ({ children }) => {
  return (
    <div className="h-[100%] bg-white">
      <Navbar />
      <div className="mb-[10%]">{children}</div>
      <Footer />
    </div>
  );
};
