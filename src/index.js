// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import EntryExitLayout from './Components/EntryExitLayout/EntryExitLayout';
// import GowningLayout from './Components/GowningLayout/GowningLayout';
// import SubLayout from './Components/SubLayout/SubLayout';
// import SummaryLayout from './Components/SummaryLayout/SummaryLayout';
// import DashboardLayout from './Components/DashboardLayout/DashboardLayout';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="home" element={<DashboardLayout />} />
//         <Route path="entry-exit" element={<EntryExitLayout/>} />
//         <Route path="gowning" element={<GowningLayout />} />
//         <Route path="sub" element={<SubLayout />} />
//         <Route path="summary/:username/:date_time" element={<SummaryLayout/>} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// reportWebVitals();

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AuthRoutes from './Components/AuthenticatedRoutes/AuthRoutes'; // Importing AuthRoutes component

// const root = createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         {/* Define routes for authenticated users */}
//         <Route path="/*" element={<AuthRoutes />} />
//         {/* <Route path="/*" element={<App />} /> */}
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// reportWebVitals();


import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoutes from './Components/AuthenticatedRoutes/AuthRoutes';
import { Link } from 'react-router-dom';


const root = createRoot(document.getElementById('root'));

const RootComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      // if (window.location.pathname !== '/') {
      //   setTimeout(() => {
      //     window.location.href = '/'; // Redirect to login page
      //   }, 3000);
      // }
      if (window.location.pathname !== '/') {
        setShowLoginPopup(true)
      }
    }
  }, []);
  const handleLoginButtonClick = () => {
    setShowLoginPopup(false); // Close the login popup
    window.location.href = '/'; // Redirect to the login page
  };
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {showLoginPopup && (
            <Route
              path="*"
              element={<div className="popup">
              <div className="popup-inner">
                <h2 className='session-h2'>Please Login</h2>
                <div className='loginbtn-div' ><span className="login-button" onClick={handleLoginButtonClick}>Login</span></div>
              </div>
            </div>}
            />
          )}
          {/* Define routes for authenticated users */}
          {isAuthenticated ? (
            <Route path="/*" element={<AuthRoutes />} />
          ) : (
            <Route path="/" element={<App />} />
          )}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

root.render(<RootComponent />);

reportWebVitals();

