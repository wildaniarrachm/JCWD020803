import { useState } from 'react';
import { Layout } from '../../components/customers/Index';
import { RegisterPage } from '../../components/customers/register/Index';
import { useLocation } from 'react-router-dom';

function RegisterUser() {
  const [view, setView] = useState(true);
  const location = useLocation();
  return (
    <div>
      <Layout>
        <RegisterPage />
      </Layout>
    </div>
  );
}

export default RegisterUser;
