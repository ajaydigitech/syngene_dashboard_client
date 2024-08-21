import React, { useState, useEffect } from 'react';
import './Summary.css';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Summary = () => {
    const [summaryData, setSummaryData] = useState([]);
    const { username, date_time, id, pageType } = useParams([]);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [moduleType,setModuleType] = useState("");

    const handleDownload = () => {

       
        const dataForDownload = summaryData.map(summary => {
            const summaryDetails = JSON.parse(summary.Summary).data.map(step => ({
                Steps: step.Step,
                ...(step.Tries !== undefined && { Tries: step.Tries }),
                Status: step.Status,
                Error: step.ErrorDetails,
                Score: step.Point,
            }));
            return summaryDetails;
        }).flat();

        const ws = XLSX.utils.json_to_sheet(dataForDownload);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Summary');
        XLSX.writeFile(wb, `${username}_summary.csv`);
        

    //below code to show username,time and module    
    //  const dataForDownload = summaryData.map(summary => {
    //     const summaryDetails = JSON.parse(summary.Summary).data.map(step => ({
    //         Steps: step.Step,
    //         ...(step.Tries !== undefined && { Tries: step.Tries }),
    //         Status: step.Status,
    //         Error: step.ErrorDetails,
    //         Score: step.Point,
    //     }));
    //     return summaryDetails;
    // }).flat();

    // const dateTime = new Date(date_time);
    // //const formattedDate = dateTime.toISOString().split('T')[0];
    // //const formattedTimeUTC = dateTime.toISOString().split('T')[1].split('.')[0];

    // const csvContent = [
    //     [username," ",dateTime," ", moduleType],
    //     ['Steps', 'Tries', 'Status', 'Error', 'Score'],
    //     ...dataForDownload.map(detail => [detail.Steps, detail.Tries || '', detail.Status, detail.Error || '', detail.Score])
    // ].map(row => row.join(',')).join('\n');

    // const blob = new Blob([csvContent], { type: 'text/csv' });
    // const url = window.URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute('download', `${username}_summary.csv`);
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    };

    useEffect(() => {

        if(pageType == "sub"){
            setModuleType("Procedure for loading and assembling the sub-bags");
        }
        else if(pageType == "fullGowning"){
            setModuleType("Entry and exit procedure for BMP 1 - Primary & secondary gowning");
        }
        else if(pageType == "entryExit"){
            setModuleType("Entry and exit procedure for BMP 1 - Primary gowning");
            
        }

        const fetchData = async () => {
            try {
                const token = localStorage.getItem('accessToken');

                if (pageType === "entryExit") {
                    const entryExitResponse = await axios.get('http://localhost:5000/syngene-reports/getEntryExitData', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const combinedData = [...entryExitResponse.data.data];
                    const filteredData = combinedData.filter(item =>
                        item.Username === username &&
                        item.date_time === date_time &&
                        parseInt(item.id) === parseInt(id)
                    );
                    // console.log(filteredData)
                    setSummaryData(filteredData);
                } else if (pageType === "fullGowning") {

                    console.log("fffff")

                    const gowningResponse = await axios.get('http://localhost:5000/syngene-reports/getGowningData', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const combinedData = [...gowningResponse.data.data];

                    console.log("g repo", gowningResponse.data.data)

                    const filteredData = combinedData.filter(item =>
                        item.Username === username &&
                        item.date_time === date_time &&
                        parseInt(item.id) === parseInt(id)
                    );
                    // console.log(filteredData)
                    setSummaryData(filteredData);
                } else {
                    const subResponse = await axios.get('http://localhost:5000/syngene-reports/getSubData', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    const combinedData = [...subResponse.data.data];
                    const filteredData = combinedData.filter(item =>
                        item.Username === username &&
                        item.date_time === date_time &&
                        parseInt(item.id) === parseInt(id)
                    );
                    // console.log(filteredData)
                    setSummaryData(filteredData);
                }

                // if (entryExitResponse.data.sucess || gowningResponse.data.sucess || subResponse.data.sucess) {
                //     const combinedData = [...entryExitResponse.data.data, ...gowningResponse.data.data, ...subResponse.data.data];
                //     const filteredData = combinedData.filter(item => 
                //       item.Username === username &&
                //       item.date_time === date_time &&
                //       parseInt(item.id) === parseInt(id)
                //   );
                //     // console.log(filteredData)
                //     setSummaryData(filteredData);

                // } else {
                //     console.log("No Data Found");
                // }

            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('accessToken'); // Clear token from localStorage
                    setError('Session expired. Please log in again.'); // Display error message
                    setShowLoginPopup(true);
                } else {
                    setError(error.message || 'Authentication failed. Please check your credentials.');
                }
            }
        };

        fetchData();
    }, [username, date_time, id]);

    const handleLoginButtonClick = () => {
        setShowLoginPopup(false);
        window.location.href = '/';
    };
    return (
        <div className='syngene-entry-exit custom-scrollbar'>
            {showLoginPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2 className='session-h2'>Your session has expired.</h2>
                        <div className='loginbtn-div' ><span className="login-button" onClick={handleLoginButtonClick}>Login Again</span></div>
                    </div>
                </div>
            )}
            <div className='syngene-entry-exit-heading-div'>
                <div className='syngene-entry-exit-heading-div-i1'>
                </div>
                <div className='syngene-entry-exit-heading-div-i2'>
                    <h1 className='syngene-entry-exit-heading'>Summary</h1>
                </div>
            </div>
            {summaryData.map(summary => (
                <div className='summary-overall-div' key={summary.id}>
                    <div className='summary-overall-div1'>
                        <h1 className='score-h1'>Overall Score : </h1>
                    </div>
                    <div className='summary-overall-div2'>
                        <h1 className='score-h1'>{summary.Overall_Score}</h1>
                        {/* {console.log(summary.Summary)} */}
                    </div>
                </div>
            ))}

            <div className='entry-exit-table-div'>
                <div className='entry-exit-table-div-inner'>
                    <table className='entry-exit-table'>
                        <tbody className='entry-exit-table-body'>
                            <tr className='tr-th'>
                                <th className='u-th tr-td'>Steps</th>
                                {summaryData.some(summary => summary.Summary && JSON.parse(summary.Summary).data.some(step => 'Tries' in step)) && <th className='u-th tr-td'>Tries</th>}
                                <th className='u-th tr-td'>Status</th>
                                <th className='u-th tr-td'>Error</th>
                                <th className='u-th tr-td'>Points</th>
                            </tr>
                            {summaryData.map((summary, index) => (
                                <React.Fragment key={index}>
                                    {summary.Summary ? JSON.parse(summary.Summary).data.map((step, stepIndex) => (
                                        <tr className='tr-border' key={stepIndex}>
                                            <td className='tr-td td-start'>{step.Step}</td>
                                            {summary.Summary && 'Tries' in step && <td className='tr-td'>{step.Tries}</td>}
                                            <td className='tr-td'>{step.Status}</td>
                                            <td className='tr-td'>{step.ErrorDetails}</td>
                                            <td className='tr-td'>{step.Point}</td>
                                        </tr>
                                    )) : null}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='download-summary-out-div'>
                <div className='download-summary-in-div' onClick={handleDownload}>Download Summary</div>
                <div>
      {/* <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <h1 style={{display:"flex",alignItems:"center",justifyContent:"center"}}>{username}&nbsp;{date_time}</h1>
           
        <div className='entry-exit-table-div'>
        <div className='entry-exit-table-div-inner'>
                    <table className='entry-exit-table'>
                        <tbody className='entry-exit-table-body'>
                            <tr className='tr-th'>
                                <th className='u-th tr-td'>Steps</th>
                                {summaryData.some(summary => summary.Summary && JSON.parse(summary.Summary).data.some(step => 'Tries' in step)) && <th className='u-th tr-td'>Tries</th>}
                                <th className='u-th tr-td'>Status</th>
                                <th className='u-th tr-td'>Error</th>
                                <th className='u-th tr-td'>Points</th>
                            </tr>
                            {summaryData.map((summary, index) => (
                                <React.Fragment key={index}>
                                    {summary.Summary ? JSON.parse(summary.Summary).data.map((step, stepIndex) => (
                                        <tr className='tr-border' key={stepIndex}>
                                            <td className='tr-td td-start'>{step.Step}</td>
                                            {summary.Summary && 'Tries' in step && <td className='tr-td'>{step.Tries}</td>}
                                            <td className='tr-td'>{step.Status}</td>
                                            <td className='tr-td'>{step.ErrorDetails}</td>
                                            <td className='tr-td'>{step.Point}</td>
                                        </tr>
                                    )) : null}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
                <div className='download-summary-out-div'>
                <div className='download-summary-in-div' onClick={handleDownload}>Download Summary</div>
                </div>
        </Box>
      </Modal> */}
    </div>


            </div>
            
        </div>
    );
};

export default Summary;

