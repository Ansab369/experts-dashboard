import React,{useEffect,useState} from "react";
import './basic.css';
// import { Link} from 'react-router-dom';
import EditBioNavBar from '../EditBioNavBar'
// import Session from '../../../Stepper/Components/Session/Session';
import DashBoardNavBoard from '../../DashBoardNavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import { db, auth } from "../../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function FeaturedSession() {
  const [userSessionTitle, setSessionTitle] = useState();
  const [userSessionAbout, setSessionAbout] = useState();
  const [userSessionLink, setSessionLink] = useState();

  //! fetch data
  useEffect(() => {
    const user = auth.currentUser;
    console.log(user)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        fetchUserData(uid);
      } else {
        // todo: display fetching data error..(server issue)
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
      setSessionTitle(data.sessionTitle);
      setSessionAbout(data.sessionAbout);
      setSessionLink(data.sessionLink);
    } else {
      console.log("No such document!");
    }
  }
  // !  use update methord..
  let sentUsernsme = async (user) => {
    try {
      const docRef = doc(db, 'users', user.uid);
      setDoc(docRef, {
        //! bio  //! is null check needed..
        sessionTitle: userSessionTitle ?? '',
        sessionAbout: userSessionAbout ?? '',
        sessionLink: userSessionLink ?? '',
      }, { merge: true });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: =======", e);
    }
  }

  function sentModifiedDetailsToFirebase() {
    const auth = getAuth();
    const user = auth.currentUser;
    sentUsernsme(user);
    return;
  }

  return (
    <div className="featuredSession">
      <DashBoardNavBoard />
      <EditBioNavBar />
      {/*//! <Session/>  */}
      <div className="ComponentA">
        <div className="infotext">
          <FontAwesomeIcon className="icon7" icon={faCircleInfo} />
          <p>Add or edit details of your featured session With Totto Learning</p>
        </div>
        <div className="Container" >
          {/* //! */}
          <div className="social-container">
            <div>
              {/* //!  { 1 } */}
              <div className="textfieldtitle">
                <p>Title</p>
              </div>
              <div className="textfieldSocial2">
                <input type="text" id="lname" name="lname" placeholder="Featured Session Title"
                  value={userSessionTitle}
                  onChange={(e) => { setSessionTitle(e.target.value) }}></input>
              </div>
              {/* //!  { 2 } */}
              <div className="textfieldtitle">
                <p>Image</p>
              </div>
              <div className="image-button1">
                <button className="button5">Select Image</button>
              </div>
              {/* //!  about */}
              <div className="textfieldtitle">
                <p>About</p>
              </div>
              <div className="textfieldSocial2">
                <textarea rows="3" cols="45" name="description" placeholder="Short Discription About Your Session"
                value={userSessionAbout}
                onChange={(e) => { setSessionAbout(e.target.value) }}>
                </textarea>
              </div>
              {/* //!  { 4 } */}
              <div className="textfieldtitle">
                <p>Link</p>
              </div>
              <div className="textfieldSocial2">
                <input type="text" id="lname" name="lname" placeholder="Featured Session Link"
                value={userSessionLink}
                onChange={(e) => { setSessionLink(e.target.value) }}></input>
              </div>
            </div>
          </div>
          {/* //!  add more button */}
          <div className="socialbutton">
            <button className="button2">Add More</button>
          </div>
        </div>
      </div>

            {/* //! */}
            <div className="dashbord-save-btn">
        <button className="btn btn-width" onClick={sentModifiedDetailsToFirebase}>Save</button>
      </div>

    </div>
  );
}

export default FeaturedSession;
