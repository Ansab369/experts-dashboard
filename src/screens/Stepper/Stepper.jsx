import React, { useState } from "react";
import './stepper.css';
import logo from '../../assets/Tottologo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import ComponentA from './Components/Bio/ComponentA';
import Social from './Components/Social/Social';
import Session from './Components/Session/Session';
import Video from './Components/Video/Video';
import Completestepper from './Components/Complete/Complete';
import { Link  } from 'react-router-dom';






function Stepper()  {
  const steps = ["Bio", "Social", "Session", "Video"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  
  return (
    <div className="stepper">
        <div className="totto-logo">
          <img src={logo} alt='logo'/>
          </div>
    {/* //!    stepper */}
          <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div key={i} className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete" } `}>
            <div className="step">
              {i + 1 < currentStep || complete ? <FontAwesomeIcon className="icon1" icon= {faCheck} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
             <div className="back-line"></div>
          </div>
        ))}
      </div>
     

      {!complete && (
        <div>
          {}
          <div>
          {
          currentStep === 1?<ComponentA />:
          currentStep ===2?<Social/>:
          currentStep===3?<Session/>:
          currentStep===4?<Video/>:null
        }
          </div>
        <div className="maxwidth" >
                <span className="iconbuttton" onClick={() => {currentStep === steps.length ? setComplete(true):setCurrentStep((prev) => prev - 1);}}>
                    <FontAwesomeIcon className= {currentStep===1?"icon6":"icon5"} id="backarrow" icon={faArrowLeft} />

                </span>
                <button
                  className="btn"
                  onClick={() => {currentStep === steps.length ? setComplete(true): setCurrentStep((prev) => prev + 1);}}>
                  {currentStep === steps.length ? "Finish" : "Next"}
                </button>
        </div>
        </div>
      )}
      {/* //! */}
      {complete && (
        <div>
          {}
          <div>
          {
         complete?<Completestepper/>:null
        }
          </div>
        <div className="maxwidth" >
                <span className="iconbuttton" onClick={() => {currentStep === steps.length ? setComplete(true):setCurrentStep((prev) => prev - 1);}}>
                    {/* <FontAwesomeIcon className= {currentStep===1?"icon6":"icon5"} id="backarrow" icon={faArrowLeft} /> */}

                </span>
                <Link to='/login' >
                <button className="btn">
                   Login
                </button></Link>
        </div>
        </div>
      )}
      
        
      

      </div>
          


  );
}


export default Stepper;
