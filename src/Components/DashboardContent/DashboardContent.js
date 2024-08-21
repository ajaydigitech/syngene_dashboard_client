import React,{useState,useEffect} from 'react'
import Dashboard from '../Dashboard/Dashboard'
import SyngeneEntryExit from '../Reports/SyngeneEntryExit/SyngeneEntryExit'
import SyngeneGowning from '../Reports/SyngeneGowning/SyngeneGowning'
import SyngeneSub from '../Reports/SyngeneSub/SyngeneSub'
import Details from '../Details/Details'
import Summary from '../Summary/Summary'
import './DashboardContent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const DashboardContent = ({ selectedComponent, onComponentSelect }) => {
  const [componentName, setComponentName] = useState(selectedComponent);
    const goBack = () => {
        const previousComponent = localStorage.getItem('lastComponent');
        onComponentSelect(previousComponent);
        localStorage.removeItem('lastComponent');
      };
    
      useEffect(() => {
        
        localStorage.setItem('lastComponent', componentName);
        setComponentName('lastComponent')
    }, [componentName]);

  return (
    <div className='scrollable-content'>
        <div className="dash-cont-heading-div">
            {selectedComponent === 'dashboard' ?<div className='welcome-admin-div'><h1 className='welcome-admin-h1'>Welcome Admin</h1></div>:
            <div className='syngene-entry-exit-heading-div'>
            <div className='syngene-entry-exit-heading-div-i1'><FontAwesomeIcon icon={faArrowLeft} className='syngene-entry-exit-heading-back-arrow' onClick={goBack} /></div>
            <div className='syngene-entry-exit-heading-div-i2'><h1 className='syngene-entry-exit-heading'>
            {selectedComponent === 'entry' ? 'Entry Exit' : 
              selectedComponent === 'gowning' ? 'Gowning' :
              selectedComponent === 'sub' ? 'Syngene Sub' :
              selectedComponent === 'details' ? 'Details' :
              selectedComponent === 'summary' ? 'Summary' :
      ''}
          </h1></div>
        </div>}
        </div>
    <div className>
      {selectedComponent === 'dashboard' && <Dashboard />}
      {selectedComponent === 'entry' && <SyngeneEntryExit  onComponentSelect={onComponentSelect} goBack={goBack}/>}
      {selectedComponent === 'gowning' && <SyngeneGowning  onComponentSelect={onComponentSelect} goBack={goBack}/>}
      {selectedComponent === 'sub' && <SyngeneSub  onComponentSelect={onComponentSelect} goBack={goBack}/>}
      {selectedComponent === 'details' && <Details  onComponentSelect={onComponentSelect}/>}
      {selectedComponent === 'summary' && <Summary  onComponentSelect={onComponentSelect}/>}
      </div>
    </div>
  )
}

export default DashboardContent



