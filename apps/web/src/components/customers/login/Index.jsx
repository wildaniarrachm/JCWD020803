import { useEffect } from 'react';
import { RegisterBody } from '../register/header/registerBody';
import { RegisterHeader } from '../register/header/registerHeader';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const LoginPage = () => {
  useEffect(() => {
    AOS.init({
      disable: false,
      once: false,
      duration: '2000',
    });
  });
  return (
    <>
      <div data-aos="fade-left">
        <RegisterHeader
          link={'login-user'}
          title={'My Account'}
          subTitle={'Login'}
        />
      </div>

      <div data-aos="fade-down">
        <RegisterBody
          title={'Sign In'}
          subTitle={'Dont have an account?'}
          link={'register-user'}
          subLink={'Create for free account'}
        />
      </div>
    </>
  );
};
