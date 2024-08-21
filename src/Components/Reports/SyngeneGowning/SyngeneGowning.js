import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

const SyngeneGowning = () => {
  const [gowningData, setGowningData] = useState(null);
  const [error, setError] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [filteredEntryExitData, setFilteredEntryExitData] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const [endDate, setEndDate] = useState('');
  const pageType = "fullGowning";
console.log(startDate,endDate)
  useEffect(() => {
    const fetchGowningData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:5000/syngene-reports/getGowningData', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            skip: (currentPage - 1) * entriesPerPage,
            limit: '',
            startDate: startDate,
            endDate: endDate
          }
        });
        
        const sortedData = response.data.data.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
        setGowningData(sortedData);
        setFilteredEntryExitData(sortedData);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('accessToken');
          setError('Session expired. Please log in again.');
          setShowLoginPopup(true);
        } else if (error.response && error.response.status === 404) {
          setFilteredEntryExitData([]);
        } else {
          setError(error.message || 'Authentication failed. Please check your credentials.');
        }
      }
    };

    fetchGowningData();
  }, [startDate, endDate, currentPage]);

  const handleLoginButtonClick = () => {
    setShowLoginPopup(false);
    window.location.href = '/';
  };

  const handleDownload = () => {
    if (filteredEntryExitData && filteredEntryExitData.length > 0) {
      const dataForDownload = filteredEntryExitData.map(entry => {
        const dateTime = new Date(entry.date_time);
        const formattedDate = dateTime.toISOString().split('T')[0];
        const formattedTimeUTC = dateTime.toISOString().split('T')[1].split('.')[0];
        return {
          username: entry.Username,
          firstname: entry.Firstname,
          lastname: entry.Lastname,
          date: formattedDate,
          time: formattedTimeUTC,
          overall_score: entry.Overall_Score,
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(dataForDownload);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'GowningData');
      XLSX.writeFile(workbook, 'gowning_Data.csv');
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchName(query);
    const filteredData = gowningData.filter(entry =>
      entry.Firstname.toLowerCase().includes(query)
      && (!startDate || new Date(entry.date_time) >= new Date(startDate))
      && (!endDate || new Date(entry.date_time) <= new Date(endDate))
    );
    setFilteredEntryExitData(filteredData);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntryExitData && filteredEntryExitData.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalEntries = filteredEntryExitData ? filteredEntryExitData.length : 0;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  return (
    <div className='syngene-entry-exit custom-scrollbar'>
      {showLoginPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2 className='session-h2'>Your session has expired.</h2>
            <div className='loginbtn-div'><span className="login-button" onClick={handleLoginButtonClick}>Login Again</span></div>
          </div>
        </div>
      )}
      <div className='syngene-entry-exit-heading-div'>
        <div className='syngene-entry-exit-heading-div-i2'><h1 className='syngene-entry-exit-heading'>Entry and exit procedure for BMP 1 - Primary & secondary gowning</h1></div>
      </div>

      <div className='searchbar-div'>
        <div className='searchbar-div-inner'>
          <input type='text' placeholder='Search By Name' className='search-input' value={searchName} onChange={handleSearchChange} />
        </div>
        <div className='searchbar-div-inner-1'>
          <label htmlFor="startDate" className='startdate-label'>Start Date: </label>
          <input type="date" id="startDate" value={startDate}  onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            const currentDate = new Date();

            // If the selected date is after the current date, prevent the change
            if (selectedDate > currentDate) {
              e.target.valueAsDate = currentDate;
              setStartDate(currentDate.toISOString().split('T')[0]);
            } else {
              setStartDate(e.target.value);
            }
          }}  className='s-date-input' />

          <label htmlFor="endDate" className='enddate-label'>End Date: </label>
          <input type="date" id="endDate" value={endDate}  onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            const currentDate = new Date();

            // If the selected date is after the current date, prevent the change
            if (selectedDate > currentDate) {
              e.target.valueAsDate = currentDate;
              setEndDate(currentDate.toISOString().split('T')[0]);
            } else {
              setEndDate(e.target.value);
            }
          }}  className='e-date-input' />
        </div>
      </div>
      <div className='searchbar-div-inner2' onClick={handleDownload}>
        <FontAwesomeIcon icon={faDownload} className='fa-download-icon' title='Download' />
      </div>
      <div className='entry-exit-table-div'>
        <div className='entry-exit-table-div-inner'>
          {error && <div className="error">{error}</div>}
          {filteredEntryExitData && filteredEntryExitData.length > 0 && (
            <table className='entry-exit-table'>
              <tbody className='entry-exit-table-body'>
                <tr className='tr-th'>
                  <th className='u-th tr-td'>First Name</th>
                  <th className='u-th tr-td'>Last Name</th>
                  <th className='u-th tr-td'>Date</th>
                  <th className='u-th tr-td'>Time</th>
                  <th className='u-th tr-td'>User Details</th>
                </tr>
                {currentEntries.map(entry => {
                  const dateTime = new Date(entry.date_time);
                  const formattedDate = dateTime.toISOString().split('T')[0];
                  const formattedTimeUTC = dateTime.toISOString().split('T')[1].split('.')[0];

                  return (
                    <tr className='tr-border' key={entry.id}>
                      <td className='tr-td'>{entry.Firstname}</td>
                      <td className='tr-td'>{entry.Lastname}</td>
                      <td className='tr-td'>{formattedDate}</td>
                      <td className='tr-td'>{formattedTimeUTC}</td>
                      <td className='tr-td'><Link to={`/summary/${pageType}/${entry.Username}/${entry.date_time}/${entry.id}`} className='page-links'>Details</Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {filteredEntryExitData && filteredEntryExitData.length === 0 && <div className='no-data-message'>No data available</div>}
        </div>
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(1)}>&laquo;</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
        ))}
        <button onClick={() => handlePageChange(totalPages)}>&raquo;</button>
      </div>
    </div>
  );
}

export default SyngeneGowning;
