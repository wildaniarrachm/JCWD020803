import { Navigate, Outlet } from 'react-router-dom';

function AdminRequired() {
  const tokenAdmin  = localStorage.getItem('tokenAdmin');
  return (
    <>{tokenAdmin ? <Outlet></Outlet> : <Navigate to={'/'} />}</>
  );
}
export default AdminRequired;