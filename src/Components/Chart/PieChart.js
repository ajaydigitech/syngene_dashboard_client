import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import './PieChart.css'

const PieChart = () => {
  const [state, setState] = useState({
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['Undertraining', 'Complete Training'],
      colors: ['#003580', '#1a86b0'], 
      responsive: [
      {
        breakpoint: 820,
        options: {
          chart: {
            width: 340
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: 416
          },
          legend: {
            position: 'right'
          }
        }
      },
      {
        breakpoint: 600,
        options: {
          chart: {
            width: 340
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 415,
        options: {
          chart: {
            width: 310
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: 'inherit', // Ensure the data label uses inherited font size
        },
      },

    },
    
    series: [0, 100],
  });

  useEffect(() => {
    
const fetchData = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlN5bmdlbmVBZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMDgyNDUyOCwiZXhwIjoxNzEwOTEwOTI4fQ.-T-N354qfpMV55WugoaoOLim8YVr4Q1s7Mifw7rrxnA';
      const response = await axios.get('http://localhost:5000/syngene-reports/countActiveUsers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log(response.data.data)
    // console.log(response.data[0].Total_Users)
    // const totalUsers=response.data[0].Total_Users
    // const activeUsers=response.data[0].Active_Users
    // console.log(totalUsers,activeUsers)
    // const inactiveUsers = totalUsers - activeUsers;
    // setState({...state,series: [activeUsers, inactiveUsers]})
    // console.log(response.data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
}, []);

    
  return (
    <div className="donut">
      <Chart  options={{
          ...state.options,
          dataLabels: {
            ...state.options.dataLabels,
            style: {
              fontSize: 'inherit',
              cssClass: ' pie-label-font', 
            },
          },
        }} series={state.series} type="pie" className="piechart" />
    </div>
  );
};

export default PieChart;
