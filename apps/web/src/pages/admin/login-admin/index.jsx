import { useMediaQuery } from 'react-responsive'
import MobileLoginAdmin from './components/formobile'
import { LoginAdmin } from './components/fordesktop'


const Login = () => {
  const isMobile = useMediaQuery({query: '(max-width: 768px)'})
  return (
    <>
    {isMobile ? (
      <MobileLoginAdmin/>
    ) : ( <LoginAdmin /> )}
    </>
  )
}

export default Login