import { useState,useEffect } from "react";
import React from 'react'
import Header from "../Header/Header";
import SidebarResp from "../Sidebar/SidebarResp";
import Sidebar from "../Sidebar/Sidebar";
import SyngeneSub from "../Reports/SyngeneSub/SyngeneSub";
const SubLayout = () => {
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
    <SyngeneSub/>
    </div>
    </>
  )
}

export default SubLayout
