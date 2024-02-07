import { useSelector } from 'react-redux';
import AdminRequired from './admin.require';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

function SuperAdminRequired() {
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.value);
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  return (
    <>
      {tokenAdmin && admin?.isSuperAdmin === true ? (
        <Outlet></Outlet>
      ) : (
        <Navigate to={'/admin-management'} />
      )}
    </>
  );
}

export default SuperAdminRequired;
