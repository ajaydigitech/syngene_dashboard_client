import React from 'react';
import './Header.css'
import syngenelogo from '../../Images/syngenelogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
  const handleLogout = () => {
    // console.log('Button Pressed');
    localStorage.removeItem('accessToken'); 
    window.location.href = '/'; 
    // Add logout logic here
  };
  return (
    <header className="fixed-header">
      <div className='header-div'>
        <img src={syngenelogo} className='syngne-logo'/>
        <button onClick={handleLogout} className="logout-button">
      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
    </button>
      </div>
    </header>
  );
};

export default Header;
