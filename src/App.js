import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import Signup from './components/Signup';
import Login from './components/Login';
import MailCheck from './components/Mailcheck'
import ResetPassword from './components/ResetPassword';
import Cart from './components/Cart';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
       <Routes>
       <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mailcheck" element={<MailCheck />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />

       </Routes>
    </div>
  );
}

export default App;
