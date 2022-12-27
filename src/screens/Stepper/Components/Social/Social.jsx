import React, { useState ,useEffect} from "react";
import "react-widgets/styles.css";
import './social.css';
// import DropdownList from "react-widgets/DropdownList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { db, auth } from "../../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import HashLoader from "react-spinners/HashLoader";

function Social({ currentStep, onBackIconClicked, nextButtonClicked }) {
  const steps = ["Bio", "Social", "Session", "Video"];

  const [userFacebookLink, setFacebookLink] = useState();
  const [userInstagramLink, setInstagramLink] = useState();
  const [userYoutubeLink, setYoutubeLink] = useState();
  const [useTwitterLink, setTwitterLink] = useState();
  const [useLinkedInLink, setLinkedInLink] = useState();
  const [loading, setLoading] = useState(false);

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
        setFacebookLink(data.socialMediaFacebook);
        setInstagramLink(data.socialMediaInstagram);
        setYoutubeLink(data.socialMediaYoutube);
        setTwitterLink(data.socialMediaTwitter);
        setLinkedInLink(data.socialMediaLinkedIn);
      } else {
        console.log("No such document!");
      }
    }


  // !  use update methord..
  let sentUsernsme = async (user) => {
    try {
      const docRef = doc(db, 'users', user.uid);
      setDoc(docRef, {
        //! bio    //! is null check needed..?
        socialMediaFacebook: userFacebookLink ?? '',
        socialMediaInstagram: userInstagramLink ?? '',
        socialMediaYoutube: userYoutubeLink ?? '',
        socialMediaTwitter: useTwitterLink ?? '',
        socialMediaLinkedIn: useLinkedInLink ?? '',

      }, { merge: true });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: =======", e);
    }
  }

  function sentDataToFireBase() {
    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;
    sentUsernsme(user);
    nextButtonClicked();
    return;
  }

  return (
    <div>
      {
        loading === true ?
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            width: "100%",
          }}>
            <HashLoader color="#8B77EE" />
          </div> : ''
      }
      <div className="ComponentA">
        <div className="infotext">
          <FontAwesomeIcon className="icon7" icon={faCircleInfo} />
          <p>Add your Social Media Links</p>
        </div>
        <div className="Container" >
          {/* //! */}
          <div className="social-container">
            <div>
              {/* //!  1 */}
              <div className="textfieldtitle">
                <p>FaceBook</p>
              </div>
              <div className="textfieldSocial2">
                <textarea rows="1" cols="45" name="description" placeholder="Facebook Profile Link"
                  value={userFacebookLink}
                  onChange={(e) => { setFacebookLink(e.target.value) }}
                >
                </textarea>
              </div>
              {/* //! 2  */}
              <div className="textfieldtitle">
                <p>Instagram</p>
              </div>
              <div className="textfieldSocial2">
                <textarea rows="1" cols="45" name="description" placeholder="Instagram Profile Link"
                  value={userInstagramLink}
                  onChange={(e) => { setInstagramLink(e.target.value) }}
                >
                </textarea>
              </div>
              {/* //! 3*/}
              <div className="textfieldtitle">
                <p>Youtube</p>
              </div>
              <div className="textfieldSocial2">
                <textarea rows="1" cols="45" name="description" placeholder="Youtube Link"
                  value={userYoutubeLink}
                  onChange={(e) => { setYoutubeLink(e.target.value) }}
                >
                </textarea>
              </div>
              {/* //! 4 */}
              <div className="textfieldtitle">
                <p>Twitter</p>
              </div>
              <div className="textfieldSocial2">
                <textarea rows="1" cols="45" name="description" placeholder="Twitter Profile Link"
                  value={useTwitterLink}
                  onChange={(e) => { setTwitterLink(e.target.value) }}
                >
                </textarea>
              </div>
              {/* //! 5 */}
              <div className="textfieldtitle">
                <p>LinkedIn</p>
              </div>
              <div className="textfieldSocial2">
                <textarea rows="1" cols="45" name="description" placeholder="LinkedIn Profile Link"
                  value={useLinkedInLink}
                  onChange={(e) => { setLinkedInLink(e.target.value) }}
                >
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="maxwidth" >
        <span className="iconbuttton" onClick={onBackIconClicked}>
          <FontAwesomeIcon className={currentStep === 1 ? "icon6" : "icon5"} id="backarrow" icon={faArrowLeft} />
        </span>
        <button
          className="btn"
          onClick={sentDataToFireBase}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      </div>


    </div>
  );
}

export default Social;
