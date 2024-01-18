import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import RegisterUser from './pages/register-user/Register';
import LoginUser from './pages/login-user/LoginPage';
import { CreatePasswordPage } from './pages/register-user/create-password/Index';
import UserRequired from './pages/required/user.required';
import { keepLoginCustomer } from './utils/customer/keep.login.customer';
import { CustomerProfile } from './components/customers/user-profile/Index';
import { VerifyCodePage } from './pages/user-dashboard/profle-detail-page/verification-code/Index';
import ResetPasswordPage from './pages/forgot-password-page/Index';
import NewPasswordPage from './pages/forgot-password-page/new-password-page/Index';
import Login from './pages/admin/LoginAdmin';
import { Overview } from './components/admin/dashboard/overview';
import { RegisterAdmin } from './components/admin/dashboard/admin-management/registeradminmodal';
import { AdminManagement } from './pages/admin/AdminManagement';
import AdminRequired from './components/required/admin.require';
import { keepLoginAdmin } from './utils/admin/keeplogin.admin';
import { AdminProfile } from './components/admin/admin-profile/Index';
import { ManageProduct } from './pages/admin/ProductManagement';
import { AdminProfilePage } from './pages/admin/Profile';
import { VerifyAdmin } from './pages/admin/verify/Index';
import { ResetPassword } from './pages/admin/reset-password/Index';
import { ProductCatalogue } from './components/admin/dashboard/product/product-catalogue/Index';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/register-user', element: <RegisterUser /> },
  { path: '/login-user', element: <LoginUser /> },
  { path: '/register-user/verify/:token', element: <CreatePasswordPage /> },
  {
    element: <UserRequired />,
    children: [
      {
        path: '/customer-dashboard/:route/:username',
        element: <CustomerProfile />,
      },
      {
        path: '/customer-dashboard/verification-phone/:verificationId',
        element: <VerifyCodePage />,
      },
    ],
  },
  { path: '/login-user/forgot-password', element: <ResetPasswordPage /> },
  {
    path: '/forgot-password/new-password/:token',
    element: <NewPasswordPage />,
  },
  { path: '/manage-product', element: <ManageProduct></ManageProduct>},
  { path: '/product-catalogue', element: <ProductCatalogue></ProductCatalogue>},
  { path: '/admin/reset-password/:tokenAdmin', element: <ResetPassword></ResetPassword> },
  { path: '/admin/set-password/:tokenAdmin', element: <VerifyAdmin></VerifyAdmin>},
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
  const token = localStorage?.getItem('token');
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      keepLoginCustomer(dispatch, token);
    } else {
      return;
    }
  }, [token]);

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
