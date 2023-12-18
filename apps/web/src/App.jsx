import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import RegisterUser from './pages/register-user/Register';
import LoginUser from './pages/login-user/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home/register-user" element={<RegisterUser />} />
        <Route path="/home/login-user" element={<LoginUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
