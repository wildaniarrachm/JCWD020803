import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import RegisterUser from './pages/register-user/Register';
import LoginUser from './pages/login-user/LoginPage';
import Login from './pages/admin/LoginAdmin';
import { Overview } from './components/admin/dashboard/overview';
import { RegisterAdmin } from './components/admin/dashboard/admin-management/registeradminmodal';
import { AdminManagement } from './pages/admin/AdminManagement';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AdminRequired from './components/required/admin.require';
import { api } from './libs/server.api';
import { keepLoginAdmin } from './utils/admin/keeplogin.admin';
import MobileLoginAdmin from './components/admin/mobile-view/login/Index';
import { AdminProfile } from './components/admin/admin-profile/Index';
import { ManageProduct } from './pages/admin/ProductManagement';
import { AdminProfilePage } from './pages/admin/Profile';
import { VerifyAdmin } from './pages/admin/verify/Index';
import { ResetPassword } from './pages/admin/reset-password/Index';
import { ProductCatalogue } from './components/admin/dashboard/product/product-catalogue/Index';


const router = createBrowserRouter([
  { path: '/manage-product', element: <ManageProduct></ManageProduct>},
  { path: '/product-catalogue', element: <ProductCatalogue></ProductCatalogue>},
  { path: '/admin/reset-password', element: <ResetPassword></ResetPassword> },
  { path: '/admin/set-password/:tokenAdmin', element: <VerifyAdmin></VerifyAdmin>},
  { path: '/', element: <Home></Home> },
  { path: '/home/register-user', element: <RegisterUser></RegisterUser> },
  { path: '/home/login-user', element: <LoginUser></LoginUser> },
  { path: '/login-admin', element: <Login></Login> },
  { path: '/overview', element: <Overview></Overview> },
  { path: '/register-admin', element: <RegisterAdmin></RegisterAdmin> },
  { path: '/admin/profile', element: <AdminProfilePage></AdminProfilePage>},
  {
    element: <AdminRequired/>,
    children: [{
      path: '/admin-management', element: <AdminManagement/>
    }  
    ]
    
  }
  
]);

function App() {
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenAdmin){
      keepLoginAdmin(dispatch, tokenAdmin)
    } else {
      return;
    }
  }, [tokenAdmin])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
