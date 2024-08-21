import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BarChart = () => {
  const [data, setData] = useState();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:5000/syngene-reports/countActiveUsers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { entryExitActiveUsers, gowingActiveUsers, subActiveUsers } = response.data.data;
        setData({ entryExitActiveUsers, gowingActiveUsers, subActiveUsers });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('accessToken');
          setShowLoginPopup(true);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const seriesData = [{ name: 'Active Users', data: data }];
    setState(prevState => ({ ...prevState, series: seriesData }));
  }, [data]);

  const [state, setState] = useState(['Syngene Entry and Exit', 'Syngene Gowning', 'Syngene SUB']);

  const handleLoginButtonClick = () => {
    setShowLoginPopup(false); // Close the login popup
    window.location.href = '/'; // Redirect to the login page
  };


  return (
    <>
      {showLoginPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2 className='session-h2'>Your session has expired.</h2>
            <div className='loginbtn-div' ><span className="login-button" onClick={handleLoginButtonClick}>Login Again</span></div>
          </div>
        </div>
      )}

      <div className='entry-exit-table-div-header'>
        <div className='entry-exit-table-div-inner'>
          <table className='entry-exit-table'>
            <tbody className='entry-exit-table-body'>
              <tr className='tr-th tr-border'>
                <th className='u-th tr-td'>Name of the module</th>
                <th className='u-th '>No. of user completed</th>
              </tr>
              <tr className='tr-border' >
                <td className='tr-td td-start' style={{padding:"10px",fontSize:"1.5rem"}}>Entry and exit procedure for BMP 1 - Primary gowning</td>
                <td className='tr-td' style={{fontSize:"1.5rem"}}>{data?.entryExitActiveUsers}</td>
              </tr>
              <tr className='tr-border' >
                <td className='tr-td td-start' style={{padding:"10px",fontSize:"1.5rem"}}>Entry and exit procedure for BMP 1 - Primary & secondary gowning</td>
                <td className='tr-td' style={{fontSize:"1.5rem"}}>{data?.gowingActiveUsers}</td>
              </tr>
              <tr className='tr-border' >
                <td className='tr-td td-start' style={{padding:"10px",fontSize:"1.5rem"}}>Procedure for loading and assembling the sub-bags</td>
                <td className='tr-td' style={{fontSize:"1.5rem"}}>{data?.subActiveUsers}</td>
              </tr>

            </tbody>
          </table>

        </div>
      </div>
    </>
  );
};

export default BarChart;

