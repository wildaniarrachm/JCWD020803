import { CustomerProfile } from './CustomerProfile';
import { CartItem } from '../../pages/cart.item/cart.item';

export const NavbarRight = () => {
  const token = localStorage.getItem('token');
  return (
    <div className="flex justify-between items-center gap-[15px] tablet:gap-[40px]">
      <div className="flex items-center absolute">
        <CartItem />
      </div>
      {token ? <CustomerProfile /> : null}
    </div>
  );
};
