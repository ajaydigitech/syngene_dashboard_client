// import React,{useState,useEffect} from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome,faFileAlt,faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
// import './Sidebar.css'


// const Sidebar = ({ onComponentSelect }) => {
//     const [showDropdown, setShowDropdown] = useState(false);
//     const toggleDropdown = () => {
//       setShowDropdown(!showDropdown);
//     };
    
//   return (
//     <>
//     <aside className="fixed-sidebar">
//       <ul className='sidebar-ul'>
//       <li className='sidebar-li' onClick={() => onComponentSelect('dashboard')}><FontAwesomeIcon icon={faHome}  className='icons-sidebar'/><span>Dashboard</span></li>
//             <li className='sidebar-li' onClick={toggleDropdown}>
//             <div className='sidebar-dropdown'>
//               <FontAwesomeIcon icon={faFileAlt} className='icons-sidebar' />
//               <span>Reports</span>
//               {showDropdown ? (
//                 <FontAwesomeIcon icon={faAngleUp} className='dropdown-arrow' />
//               ) : (
//                 <FontAwesomeIcon icon={faAngleDown} className='dropdown-arrow' />
//               )}
//             </div></li>
//             {showDropdown && (
//               <ul className='dropdown-menu'>
//               <li className='sidebar-li'  onClick={() => onComponentSelect('entry')}>Syngene Entry and Exit </li>
//               <li className='sidebar-li'  onClick={() => onComponentSelect('gowning')}>Syngene Gowning </li>
//               <li className='sidebar-li'  onClick={() => onComponentSelect('sub')}>Syngene SUB </li>
//               </ul>
//             )}
          
//           </ul>
//     </aside>
// </>
//   );
// };

// export default Sidebar;


import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faFileAlt,faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css'
import { Link } from 'react-router-dom';


const Sidebar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
    
  return (
  
    <aside className="fixed-sidebar">
      <ul className='sidebar-ul'>
      <Link to='/home' className='sidebar-links'><li className='sidebar-li' ><FontAwesomeIcon icon={faHome}  className='icons-sidebar'/><span>Dashboard</span></li></Link>
            <li className='sidebar-li' onClick={toggleDropdown}>
            <div className='sidebar-dropdown'>
              <FontAwesomeIcon icon={faFileAlt} className='icons-sidebar' />
              <span>Reports</span>
              {showDropdown ? (
                <FontAwesomeIcon icon={faAngleUp} className='dropdown-arrow' />
              ) : (
                <FontAwesomeIcon icon={faAngleDown} className='dropdown-arrow' />
              )}
            </div></li>
            {showDropdown && (
              <ul className='dropdown-menu'>
              <Link to='/entry-exit' className='sidebar-links'><li className='sidebar-li' >Entry and exit procedure for BMP 1 - Primary gowning</li></Link>
              <Link to='/gowning' className='sidebar-links'><li className='sidebar-li' >Entry and exit procedure for BMP 1 - Primary & secondary gowning</li></Link>
              <Link to='/sub' className='sidebar-links'><li className='sidebar-li'  >Procedure for loading and assembling the sub-bags</li></Link>
              </ul>
            )}
          
          </ul>
    </aside>

  );
};

export default Sidebar;