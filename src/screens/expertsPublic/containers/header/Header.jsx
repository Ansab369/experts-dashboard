import React from "react";
import { useState, useEffect } from "react";
import './header.css';
import userimage from '../../../../assets/expertsAssets/userimage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faBuilding } from '@fortawesome/free-solid-svg-icons';

import { auth, db } from "../../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Header() {

  const [toggleState, setToggleState] = useState(1);

  const [userName, setUserName] = useState();
  const [location, setLocation] = useState();
  const [organization, setOrganization] = useState();
  const [about, setAbout] = useState();
  const [expertIn, setExpertIn] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        fetchUserData(uid);
      } else {

      }
    });
  }, []);

  let fetchUserData = async (uid) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (docSnap.exists()) {
      setUserName(data.username);
      setLocation(data.location);
      setOrganization(data.organization);
      setAbout(data.about);
      setExpertIn(data.expertsIn);
      setEducation(data.education);
    } else {
      console.log("No such document!");
    }
  }




  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="header section__padding">
      <div className="header-photo-section1">
        <div className="header-image1">
          <span>
            <div className="border1">
              <img src={userimage} alt='user' />
            </div>
          </span>
        </div>
      </div>
      <div className="header-user">
        <div className="header-user-details-1">
          <h1>{userName}</h1>
          <div className="header-user-location">
            <p><FontAwesomeIcon icon={faLocationDot} /> {location}</p>
            <p><FontAwesomeIcon icon={faBuilding} /> {organization}</p>
          </div>
          <p>{about}</p>
        </div>
        <div className="header-user-details">
          <div className="header-user-details-tab">
            <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>Expert In</div>
            <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>Education</div>
          </div>
 {/* //!  expertIn */}
        </div>
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
          {expertIn.map((e) => {
            return <div className="education">
              <p>{e}</p>
            </div>
          })}
        </div>
        <div className={toggleState === 2 ? "content  active-content" : "content"}>
          <div className="education" >
            <p>{education}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;