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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import VerifyNewEmailPage from './pages/verify-new-email/Index';
import { getCustomerAddress } from './utils/address/get.customer.address';
import { addressData } from './redux/customer.address.slice';
import EditAddressPage from './pages/user-dashboard/address/edit-address/Index';
import { getAllProvince } from './utils/address/get.province';
import { setProvinces } from './redux/province.slice';
import { ToastContainer } from 'react-toastify';
import { setData } from './redux/customer.slice';
import { AdminTable } from './components/admin/dashboard/admin-management/admintable';
import BranchPage from './pages/admin/branch-page/Index';
import NewBranchPage from './pages/admin/branch-page/new-branch/Index';
import EditBranchPage from './pages/admin/branch-page/edit-branch/Index';
import SuperAdminRequired from './components/required/super.admin.required';
import { Cart } from './pages/cart.page/Cart';
import { CheckoutPage } from './pages/checkout.page/Checkout';
import { OrderHistory } from './components/order-history/order-history';
import { positionData } from './redux/position.slice';
import { deliveryData } from './redux/delivery.slice';
import { getHeadBranch } from './utils/branch/get.head.branch';
import 'react-toastify/dist/ReactToastify.css';
import ReverificationPage from './pages/reverification-page';
import { AdminTransaction } from './components/transaction-admin/admin-transaction';
import DetailVouchersPage from './pages/user-dashboard/detail-vouchers';


const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/register-user', element: <RegisterUser /> },
  { path: '/login-user', element: <LoginUser /> },
  { path: '/register-user/verify/:token', element: <CreatePasswordPage /> },
  {
    element: <UserRequired />,
    children: [
      {
        path: '/customer-dashboard/:route/',
        element: <CustomerProfile />,
      },
      {
        path: '/customer-dashboard/verification-phone/:verificationId',
        element: <VerifyCodePage />,
      },
      {
        path: '/customer-dashboard/address/:id',
        element: <EditAddressPage />,
      },
      {
        path: '/verification/:token',
        element: <VerifyNewEmailPage />,
      },
      {
        path: '/customer-dashboard/vouchers/detail/:code',
        element: <DetailVouchersPage />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/cart/shipment',
        element: <CheckoutPage />,
      },
      {
        path: '/customer-dashboard/profile/order-history',
        element: <OrderHistory />,
      },
    ],
  },
  { path: '/login-user/forgot-password', element: <ResetPasswordPage /> },
  {
    path: '/forgot-password/new-password/:token',
    element: <NewPasswordPage />,
  },
  {
    path: '/reverification',
    element: <ReverificationPage />,
  },

  //admin
  {
    path: '/product-catalogue',
    element: <ProductCatalogue></ProductCatalogue>,
  },
  {
    path: '/admin/reset-password/:tokenAdmin',
    element: <ResetPassword></ResetPassword>,
  },
  {
    path: '/admin/set-password/:tokenAdmin',
    element: <VerifyAdmin></VerifyAdmin>,
  },
  { path: '/login-admin', element: <Login></Login> },
  { path: '/overview', element: <Overview></Overview> },
  { path: '/register-admin', element: <RegisterAdmin></RegisterAdmin> },
  { path: '/admin/profile', element: <AdminProfilePage></AdminProfilePage> },
  { path: '/admin/transaction', element: <AdminTransaction /> },
  {
    element: <AdminRequired />,
    children: [
      {
        path: '/admin-management',
        element: <AdminManagement />,
      },
      { path: '/dashboard/products', element: <ManageProduct></ManageProduct> },
    ],
  },

  {
    element: <SuperAdminRequired />,
    children: [
      {
        path: '/dashboard/branch',
        element: <BranchPage />,
      },
      {
        path: '/branch/new-branch',
        element: <NewBranchPage />,
      },
      {
        path: '/branch/edit/:id',
        element: <EditBranchPage />,
      },
    ],
  },
]);

function App() {
  const token = localStorage?.getItem('token');
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const dispatch = useDispatch();
  const deliveried = useSelector((state) => state.delivery.value);
  const getAddress = async () => {
    if (token) {
      const response = await getCustomerAddress(token);
      if (response?.data?.result?.length > 1) {
        const deliveryAddress = response?.data?.result?.filter(
          (delivery) => delivery?.isDeliveried === true,
        );
        dispatch(deliveryData(deliveryAddress));
      } else {
        dispatch(deliveryData(response?.data?.result));
      }
      dispatch(addressData(response?.data?.result));
    }
  };
  const getProvince = async () => {
    if (token) {
      const response = await getAllProvince();
      if (response?.data?.rajaongkir?.results) {
        dispatch(setProvinces(response?.data?.rajaongkir?.results));
      } else {
        dispatch(setProvinces(response?.data));
      }
    }
  };
  const keepLoginCustomers = async () => {
    if (token !== null) {
      const response = await keepLoginCustomer(token);
      dispatch(setData(response?.data?.result));
    }
  };
  const getStoreLocation = async () => {
    if (token) {
      if (deliveried) {
        deliveried?.map((deliveried) => {
          dispatch(positionData(deliveried));
        });
      }
    } else if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(positionData(position?.coords));
      });
    }
  };

  useEffect(() => {
    keepLoginCustomers();
  }, [token]);

  useEffect(() => {
    if (tokenAdmin) {
      keepLoginAdmin(dispatch, tokenAdmin);
    }
  }, [tokenAdmin]);

  useEffect(() => {
    getAddress();
    getProvince();
  }, []);
  useEffect(() => {
    getStoreLocation();
  }, [deliveried]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
