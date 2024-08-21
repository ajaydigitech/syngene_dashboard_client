import React from 'react'
import './Dashboard.css'
import Chart from 'chart.js/auto';
import PieChart from '../Chart/PieChart';
import BarChart from '../Chart/ModuleComplitionTable';

const Dashboard = () => {
  const myUserName = localStorage.getItem("username")
  return (
    <div className='dashboard-div custom-scrollbar'>
      <div className='welcome-admin-div'><h1 className='welcome-admin-h1'>Welcome {myUserName}</h1></div>
      <div className='dashboard-chart-div'>
        {/* <div className='dashboard-piechart-div'>
          <PieChart/>
        </div> */}
        {/* <div className='dashboard-barchart-div'> */}
          <BarChart/>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Dashboard
