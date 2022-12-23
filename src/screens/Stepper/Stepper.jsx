import React, { useState  } from "react";
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

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



function Stepper() {

  const [profileImage, setProfileImage] = useState(null);
  const [userUrl, setUserUrl] = useState();
  


  let sentUsernsme = async (user, profilePicUrl) => {
    try {
      const docRef = doc(db, 'users', user.uid);
      setDoc(docRef, {
        //! bio
        firstName: formData['firstName'] ?? '',
        lastName: formData['lastName'] ?? '',
        userImageUrl: profilePicUrl,
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
        sessionData: formData['sessionData'] ?? "",
        // sessionAbout: formData['sessionAbout'] ?? "",
        // sessionLink: formData['sessionLink'] ?? "",
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

  async function sentDetailsToFirebase () {
    const auth = getAuth();
    const user = auth.currentUser;
    const storage = getStorage();
    const storageRef = ref(storage, `userProfile/${user.uid}/${profileImage.name}`);

     let snapshot =await uploadBytes(storageRef, profileImage);
     let url = await getDownloadURL(snapshot.ref) ;
    //  setUserUrl(url);
     sentUsernsme(user, url);
    currentStep === steps.length ? setComplete(true) : setCurrentStep((prev) => prev + 1);
    return;
  }
   function nextButtonClicked () {
    currentStep === steps.length ? setComplete(true) : setCurrentStep((prev) => prev + 1);
    return;
  }
   function onBackIconClicked () {
    currentStep === steps.length + 1 ? setComplete(true) : setCurrentStep((prev) => prev - 1);
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
              // currentStep === 1 ? <ComponentA formData={formData} updateField={updateField} setProfileImage={setProfileImage} /> :
              currentStep === 1 ? <ComponentA onBackIconClicked={onBackIconClicked} nextButtonClicked={nextButtonClicked} currentStep={currentStep}/> :
                currentStep === 2 ? <Social onBackIconClicked={onBackIconClicked} nextButtonClicked={nextButtonClicked} currentStep={currentStep} /> :
                  currentStep === 3 ? <Session  onBackIconClicked={onBackIconClicked} nextButtonClicked={nextButtonClicked} currentStep={currentStep}/> :
                    currentStep === 4 ? <Video onBackIconClicked={onBackIconClicked} nextButtonClicked={nextButtonClicked} currentStep={currentStep} /> : null
            }
          </div>
          {/* <div className="maxwidth" >
            <span className="iconbuttton" onClick={() => { currentStep === steps.length + 1 ? setComplete(true) : setCurrentStep((prev) => prev - 1); }}>
              <FontAwesomeIcon className={currentStep === 1 ? "icon6" : "icon5"} id="backarrow" icon={faArrowLeft} />

            </span>
            <button
              className="btn"
              onClick={sentDetailsToFirebase}>
              {currentStep === steps.length ? "Finish" : "Next"}
            </button>
          </div> */}
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
