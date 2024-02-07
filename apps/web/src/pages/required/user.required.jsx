import { Navigate, Outlet } from 'react-router-dom';

function UserRequired() {
  const token  = localStorage.getItem('token');
  return (
    <>{token ? <Outlet></Outlet> : <Navigate to={'/login-user'} />}</>
  );
}
export default UserRequired;
