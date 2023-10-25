import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import cartImage from './pngimg.com - shopping_cart_PNG42.png';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userInfo = {
        email,
        password,
      };

      const res = await fetch(`https://project1-backend-9whj.onrender.com/users/login`, {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (data.data === 'invalid') {
        alert('Invalid email/password');
      } else {
        localStorage.setItem('token', data.data);
        localStorage.setItem('email', data.email);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('name', data.name);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5 login_container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className='logo_with_name'>
          <img src={cartImage} alt="cart"/>
          <p>E-commerce Platform</p>
          </div>
          <div className="card login-card">
            <div className="card-body">
              <div>
                <h5 className="card-title">User Login</h5>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group text-center">
                  <Link to="/mailcheck" className="forgot-password-link">
                    Forgot Password?
                  </Link>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block" onClick={handleLogin}>
                    Login
                  </button>
                </div>
                <div className="text-center">
                <p className="mb-0">Don't have an account? <Link to="/signup">Sign Up</Link></p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
