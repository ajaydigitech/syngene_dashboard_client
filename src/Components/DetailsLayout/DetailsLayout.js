import { useState,useEffect } from "react";
import React from 'react'
import Header from "../Header/Header";
import SidebarResp from "../Sidebar/SidebarResp";
import Sidebar from "../Sidebar/Sidebar";
import Details from "../Details/Details";
import { useParams } from 'react-router-dom';

const DetailsLayout = ({ entryExitArr }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 767);
    const { username } = useParams();

 
    const userDetails = entryExitArr.find(user => user.username === username);
  
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
    {userDetails && <Details details={userDetails.details} />}
    </div>
    </>
  )
}

export default DetailsLayout


