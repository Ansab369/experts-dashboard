import React, { useState, useEffect } from "react";
import './basic.css';
// import { Link} from 'react-router-dom';
import EditBioNavBar from '../EditBioNavBar'
// import Video from '../../../Stepper/Components/Video/Video';
import DashBoardNavBoard from '../../DashBoardNavBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import { db, auth } from "../../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function FeaturedVideo() {
  const [userVideoTitle, setVideoTitle] = useState();
  const [userVideoAbout, setVideoAbout] = useState();
  const [userVideoLink, setVideoLink] = useState();

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
      setVideoTitle(data.videoTitle);
      setVideoAbout(data.videoAbout);
      setVideoLink(data.videoLink);
    } else {
      console.log("No such document!");
    }
  }
  // !  use update methord..
  let sentUsernsme = async (user) => {
    try {
      const docRef = doc(db, 'users', user.uid);
      setDoc(docRef, {
        //! bio//! is null check needed..
        videoTitle: userVideoTitle ?? '',
        videoAbout: userVideoAbout ?? '',
        videoLink: userVideoLink ?? '',
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
    <div className="featuredVideo">
      <DashBoardNavBoard />
      <EditBioNavBar />
      {/*//! <Video/> */}
      <div className="ComponentA">
        <div className="infotext">
          <FontAwesomeIcon className="icon7" icon={faCircleInfo} />
          <p>Add details your featured session With Totto Learning</p>
        </div>
        <div className="Container" >
          {/* //! */}
          <div className="social-container">
            <div>
              {/* //! videoTitle */}
              <div className="textfieldtitle">
                <p>Title</p>
              </div>
              <div className="textfieldSocial2">
                <input type="text" id="lname" name="lname" placeholder="Featured Session Title"
                  value={userVideoTitle}
                  onChange={(e) => { setVideoTitle(e.target.value) }}></input>
              </div>
              {/* //!  about */}
              <div className="textfieldtitle">
                <p>About</p>
              </div>
              <div className="textfieldSocial2">
                <textarea rows="3" cols="45" name="description" placeholder=""
                  value={userVideoAbout}
                  onChange={(e) => { setVideoAbout(e.target.value) }}>
                </textarea>
              </div>
              {/* //!  { 4 } */}
              <div className="textfieldtitle">
                <p>Link</p>
              </div>
              <div className="textfieldSocial2">
                <input type="text" id="lname" name="lname" placeholder="Featured Session Link"
                  value={userVideoLink}
                  onChange={(e) => { setVideoLink(e.target.value) }}></input>
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

export default FeaturedVideo;
