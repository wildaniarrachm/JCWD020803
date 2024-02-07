import { RegisterBody } from './header/registerBody';
import { RegisterHeader } from './header/registerHeader';
import 'aos/dist/aos.css';

export const RegisterPage = () => {
  return (
    <>
      <div data-aos="fade-left" data-aos-duration="1000">
        <RegisterHeader
          link={'register-user'}
          subTitle={'Register'}
          title={'Register Now'}
        />
      </div>

      <div data-aos="fade-down" data-aos-duration="1000">
        <RegisterBody
          title={'Sign Up'}
          subTitle={'Already have an account?'}
          link={'login-user'}
          subLink={'Sign in'}
        />
      </div>
    </>
  );
};
