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
import { Link } from 'react-router-dom';

import { db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";




function Stepper() {

  let sentUsernsme = async (user) => {
    try {
      const docRef = doc(db, 'users', user.uid);
      setDoc(docRef, {
        //! bio
        username: formData['userName'] ?? '',
        location: formData['location'] ?? '',
        organization: formData['organization'] ?? '',
        about: formData['about'] ?? '',
        education: formData['education'] ?? '',
        expertsIn: formData['expertsIn'] ?? '',
        skills: formData['skills'] ?? '',
        //! social
        socialMediaFacebook: formData['socialMediaFacebook'] ?? "",
        socialMediaInstagram: formData['socialMediaInstagram'] ?? "",
        socialMediaYoutube: formData['socialMediaYoutube'] ?? "",
        socialMediaTwitter: formData['socialMediaTwitter'] ?? "",
        socialMediaLinkedIn: formData['socialMediaLinkedIn'] ?? "",
        //! session
        sessionTitle: formData['sessionTitle'] ?? "",
        sessionAbout: formData['sessionAbout'] ?? "",
        sessionLink: formData['sessionLink'] ?? "",
        //! video
        videoTitle: formData['videoTitle'] ?? "",
        videoAbout: formData['videoAbout'] ?? "",
        videoLink: formData['videoLink'] ?? "",

      }, { merge: true });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: =======", e);
    }
  }

  function sentDetailsToFirebase() {
    const auth = getAuth();
    const user = auth.currentUser;
    sentUsernsme(user);
    currentStep === steps.length ? setComplete(true) : setCurrentStep((prev) => prev + 1);
    return;
  }

  const steps = ["Bio", "Social", "Session", "Video"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const [formData, setFormData] = useState({});

  function updateField(field, value) {
    setFormData({
      ...formData,
      [field]: value,
    })
  }


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
              currentStep === 1 ? <ComponentA formData={formData} updateField={updateField} /> :
                currentStep === 2 ? <Social formData={formData} updateField={updateField} /> :
                  currentStep === 3 ? <Session formData={formData} updateField={updateField} /> :
                    currentStep === 4 ? <Video formData={formData} updateField={updateField} /> : null
            }
          </div>
          <div className="maxwidth" >
            <span className="iconbuttton" onClick={() => { currentStep === steps.length + 1 ? setComplete(true) : setCurrentStep((prev) => prev - 1); }}>
              <FontAwesomeIcon className={currentStep === 1 ? "icon6" : "icon5"} id="backarrow" icon={faArrowLeft} />

            </span>
            <button
              className="btn"
              // onChange={(e) =>setEmail(e.target.value)}
              onClick={sentDetailsToFirebase}
            // onClick={() => {currentStep === steps.length ? setComplete(true): setCurrentStep((prev) => prev + 1);}}
            >
              {currentStep === steps.length ? "Finish" : "Next"}
            </button>
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
