import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';
import AuthRoutes from '../AuthenticatedRoutes/AuthRoutes';
import syngenelogo from '../../Images/syngene_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Colors } from 'chart.js';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showloginForm, setShowLoginForm] = useState(true)
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        userName: username,
        password: password
      });

      if (response.data.success) {
        setIsAuthenticated(true);
        console.log('Authentication successful');
        // console.log(response.data.access_token);
        localStorage.setItem('username', username);
        localStorage.setItem('accessToken', response.data.access_token);
        setError('');
        window.location.href = '/home';

      } else {
        throw new Error(response.data.message || 'Authentication failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 unauthorized error
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken'); // Clear token from localStorage
        setError('Authentication failed. Please check your credentials.'); // Display error message
        setShowLoginPopup(true);
      } else {
        setError(error.message || 'Authentication failed. Please check your credentials.');
      }
    }
  };

  const handleLoginButtonClick = () => {
    setShowLoginPopup(false);
    window.location.href = '/';
  };

  return (

    <div className="parent-container">
      <div className="other-element">
        <img src={syngenelogo} style={{ width: '25rem',color:'#003580' }} />
      </div>
      <div className="login-outer-div">
        {!showLoginPopup && showloginForm && (
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className='formTitle'>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={username} onChange={handleUsernameChange} required />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              {/* <input type="password" id="password" value={password}  onChange={handlePasswordChange} required /> */}
              <div className="password-input-container">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <FontAwesomeIcon style={{color:'#003580'}} icon={passwordVisible ?  faEye : faEyeSlash} onClick={togglePasswordVisibility} className="password-toggle-icon" />
              </div>
            </div>
            <button type="submit">Login</button>
          </form>)}
        {isAuthenticated ? (
          <AuthRoutes />
        ) : null}
        {/* Login Popup */}
        {showLoginPopup && (
          <div className="login-popup-error">
            <p>{error}</p>
            <button onClick={handleLoginButtonClick}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;