import { RegisterBody } from './header/RegisterBody';
import { RegisterHeader } from './header/RegisterHeader';

export const RegisterPage = () => {
  return (
    <div className="w-full h-screen">
      <RegisterHeader />
      <RegisterBody />
    </div>
  );
};
