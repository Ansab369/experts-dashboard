import React, { useState } from "react";
import './stepper.css';
import logo from '../../assets/Tottologo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import ComponentA from './Components/Bio/ComponentA';
import Social from './Components/Social/Social';
// import Session from './Components/Session/Session';
// import Video from './Components/Video/Video';
import Completestepper from './Components/Complete/Complete';
import { Link } from 'react-router-dom';

// import { db } from "../../firebase";
// import { setDoc, doc } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



function Stepper() {

  // const [profileImage, setProfileImage] = useState(null);
  // const [userUrl, setUserUrl] = useState();


  function nextButtonClicked() {
    currentStep === steps.length ? setComplete(true) : setCurrentStep((prev) => prev + 1);
    return;
  }
  function onBackIconClicked() {
    currentStep === steps.length + 1 ? setComplete(true) : setCurrentStep((prev) => prev - 1);
    return;
  }

  // const steps = ["Bio", "Social", "Session", "Video"];
  const steps = ["Bio", "Social"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);



  return (
    <div className="stepper">
      <div className="totto-logo">
        <img src={logo} alt='logo' />
      </div>
      {/* //!    stepper */}
      <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div key={i} className={`step-item ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"} `}>
            <div className="step">
              {i + 1 < currentStep || complete ? <FontAwesomeIcon className="icon1" icon={faCheck} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
            <div className="back-line"></div>
          </div>
        ))}
      </div>


      {!complete && (
        <div>
          { }
          <div>
            {
              currentStep === 1 ? <ComponentA onBackIconClicked={onBackIconClicked} nextButtonClicked={nextButtonClicked} currentStep={currentStep} /> :
              currentStep === 2 ? <Social onBackIconClicked={onBackIconClicked} nextButtonClicked={nextButtonClicked} currentStep={currentStep} /> :null
           // currentStep === 3 ? <Session onBackIconClicked={onBackIconClicked} nextButtonClicked={nextButtonClicked} currentStep={currentStep} /> :
           // currentStep === 4 ? <Video onBackIconClicked={onBackIconClicked} nextButtonClicked={nextButtonClicked} currentStep={currentStep} /> : null
            }
          </div>

        </div>
      )}
      {/* //! */}
      {complete && (
        <div>
          { }
          <div>
            {
              complete ? <Completestepper /> : null
            }
          </div>
          <div className="maxwidth" >
            <span className="iconbuttton" onClick={() => { currentStep === steps.length ? setComplete(true) : setCurrentStep((prev) => prev - 1); }}>
            </span>
            <Link to='/' >
              <button className="btn1">
                Goto DashBoard
              </button></Link>
          </div>
        </div>
      )}
    </div>
  );
}


export default Stepper;
