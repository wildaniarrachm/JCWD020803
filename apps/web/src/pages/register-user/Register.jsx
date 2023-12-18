import { useState } from 'react';
import { MobilePage } from '../../components/landing-page/mobile-view/Index';
import { RegisterPage } from '../../components/landing-page/mobile-view/register/Index';
import { useLocation,} from 'react-router-dom';

function RegisterUser() {
  const [view, setView] = useState(true);
  const location = useLocation();
  return (
    <div>
      <MobilePage>
        <RegisterPage />
      </MobilePage>
    </div>
  );
}

export default RegisterUser;
