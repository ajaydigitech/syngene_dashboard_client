import React,{useState,useRef,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faFileAlt} from '@fortawesome/free-solid-svg-icons';
import './SidebarResp.css'
import { Link } from 'react-router-dom';

const SidebarResp = () => {
  const [showSideDropdown, setShowSideDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSideDropdown = () => {
    setShowSideDropdown(!showSideDropdown);
  };

  const handleClick = () => {
    setShowSideDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSideDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <div className='sidebar-response-div'>
        <ul className='sidebar-response-div-ul'>
        <Link to='/home' className='sidebar-links'><li className='sidebar-response-div-li' onClick={handleClick}><FontAwesomeIcon icon={faHome} className='icons-resp-sidebar' /></li></Link>
          <li className='sidebar-response-div-li' onClick={toggleSideDropdown}>
            <FontAwesomeIcon icon={faFileAlt} className='icons-resp-sidebar' />
          </li>
        </ul>
      </div>
      {showSideDropdown && (
        <div className='sidebar-response-dropdown-menu-div' ref={dropdownRef}>
          <ul className='sidebar-response-dropdown-menu'>
          <Link to='/entry-exit' className='sidebar-links'><li className='sidebar-response-div-li' onClick={handleClick}>
          Entry & Exit Procedure for Biologics Manufacturing Plant 1 - Primary Gowning
            </li>
            </Link>
            <Link to='/gowning' className='sidebar-links'><li className='sidebar-response-div-li' onClick={handleClick}>
              Syngene Gowning
            </li></Link>
            <Link to='/sub' className='sidebar-links'>
            <li className='sidebar-response-div-li' onClick={handleClick}>
              Syngene SUB
            </li></Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default SidebarResp;



