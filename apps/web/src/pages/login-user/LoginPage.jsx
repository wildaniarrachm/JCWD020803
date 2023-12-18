import { MobilePage } from '../../components/landing-page/mobile-view/Index';
import { LoginPage } from '../../components/landing-page/mobile-view/login/Index';

function LoginUser() {

  return (
    <div>
      <MobilePage>
        <LoginPage />
      </MobilePage>
    </div>
  );
}

export default LoginUser;
