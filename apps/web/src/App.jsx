import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import RegisterUser from './pages/register-user/Register';
import LoginUser from './pages/login-user/LoginPage';
import UserRequired from './pages/required/user.required';
import { keepLoginCustomer } from './utils/customer/keep.login.customer';
import ResetPasswordPage from './pages/forgot-password-page/Index';
import NewPasswordPage from './pages/forgot-password-page/new-password-page/Index';
import Login from './pages/admin/LoginAdmin';
import { Overview } from './components/admin/dashboard/overview';
import { RegisterAdmin } from './components/admin/dashboard/admin-management/registeradminmodal';
import { AdminManagement } from './pages/admin/AdminManagement';
import AdminRequired from './components/required/admin.require';
import { keepLoginAdmin } from './utils/admin/keeplogin.admin';
import { ManageProduct } from './pages/admin/ProductManagement';
import { AdminProfilePage } from './pages/admin/Profile';
import { VerifyAdmin } from './pages/admin/verify/Index';
import { ResetPassword } from './pages/admin/reset-password/Index';
import { ProductCatalogue } from './components/admin/dashboard/product/product-catalogue/Index';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import VerifyNewEmailPage from './pages/verify-new-email/Index';
import { getCustomerAddress } from './utils/address/get.customer.address';
import { addressData } from './redux/customer.address.slice';
import EditAddressPage from './pages/user-dashboard/address/edit-address/Index';
import { getAllProvince } from './utils/address/get.province';
import { setProvinces } from './redux/province.slice';
import { ToastContainer } from 'react-toastify';
import { setData } from './redux/customer.slice';
import BranchPage from './pages/admin/branch-page/Index';
import NewBranchPage from './pages/admin/branch-page/new-branch/Index';
import EditBranchPage from './pages/admin/branch-page/edit-branch/Index';
import SuperAdminRequired from './components/required/super.admin.required';
import { Cart } from './pages/cart.page/Cart';
import { CheckoutPage } from './pages/checkout.page/Checkout';
import { OrderHistory } from './components/order-history/order-history';
import { positionData } from './redux/position.slice';
import { deliveryData } from './redux/delivery.slice';
import 'react-toastify/dist/ReactToastify.css';
import { AdminTransaction } from './components/transaction-admin/admin-transaction';
import { ManageTransaction } from './pages/admin/ManageTransaction';
import CreatePasswordPage from './pages/register-user/create-password/Index';
import VerifyCodePages from './pages/user-dashboard/profle-detail-page/verification-code/Index';
import DetailVouchersPage from './pages/user-dashboard/detail-vouchers/index';
import ReverificationPage from './pages/reverification-page/index';
import CustomerProfile from './components/customers/user-profile/Index';
import { fetchMapboxLngLat } from './utils/address/fetch.mapbox.geocode';

function App() {
  const [placeName, setPlaceName] = useState();
  const router = createBrowserRouter([
    { path: '/', element: <Home placeName={placeName} /> },
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
          element: <VerifyCodePages />,
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
        {
          path: '/dashboard/products',
          element: <ManageProduct></ManageProduct>,
        },
        { path: '/admin-transaction', element: <ManageTransaction /> },
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
  const token = localStorage?.getItem('token');
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const dispatch = useDispatch();
  const getAddress = async () => {
    const response = await getCustomerAddress(token);
    if (response?.data) {
      if (response?.data?.result?.length > 1) {
        const deliveryAddress = response?.data?.result?.filter(
          (delivery) => delivery?.isDeliveried === true,
        );
        dispatch(positionData(deliveryAddress));
        dispatch(deliveryData(deliveryAddress));
      } else {
        dispatch(positionData(response?.data?.result[0]));
        dispatch(deliveryData(response?.data?.result));
      }
      dispatch(addressData(response?.data?.result));
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          dispatch(positionData(position?.coords));
          const response = await fetchMapboxLngLat(position?.coords);
          setPlaceName(response?.features[0]?.place_name);
        });
      }
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

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
