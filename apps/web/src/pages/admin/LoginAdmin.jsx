import { useMediaQuery } from 'react-responsive';
import LoginAdmin from '../../components/admin/desktop-view/Index';
import MobileLoginAdmin from '../../components/admin/mobile-view/login/Index';

const Login = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return <>{isMobile ? <MobileLoginAdmin /> : <LoginAdmin />}</>;
};

export default Login;
