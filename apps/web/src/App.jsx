import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import Login  from './pages/admin/login-admin/index'

const router = createBrowserRouter([
  { path : "/", element: <Home></Home> },
  { path : 'login-admin', element: <Login></Login>}
])


function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
