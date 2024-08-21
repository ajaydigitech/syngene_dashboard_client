import React,{useState,useEffect} from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Dashboard from '../Dashboard/Dashboard'
import SidebarResp from '../Sidebar/SidebarResp'

const DashboardLayout = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  return (
    <>
    <Header/>
    {isMobile ? (
        <SidebarResp  />
      ) : (
    <Sidebar />)}
    <div className='scrollable-content'>
    <Dashboard/>
    </div>
    </>

  )
}

export default DashboardLayout
