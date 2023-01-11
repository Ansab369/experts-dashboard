import React, { useState, useEffect } from "react";
import "react-widgets/styles.css";
import './social.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { db, auth } from "../../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import HashLoader from "react-spinners/HashLoader";

function Social({ currentStep, onBackIconClicked, nextButtonClicked }) {
  const steps = ["Bio", "Social"];

  const [userFacebookLink, setFacebookLink] = useState("");
  const [userInstagramLink, setInstagramLink] = useState("");
  const [userYoutubeLink, setYoutubeLink] = useState("");
  const [useTwitterLink, setTwitterLink] = useState("");
  const [useLinkedInLink, setLinkedInLink] = useState("");

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
      setFacebookLink(data.socialMediaFacebook ?? '');
      setInstagramLink(data.socialMediaInstagram ?? '');
      setYoutubeLink(data.socialMediaYoutube ?? '');
      setTwitterLink(data.socialMediaTwitter ?? '');
      setLinkedInLink(data.socialMediaLinkedIn ?? '');
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

  const [instaErrorMesage, setInstaErrorMesage] = useState('');
  const [facebookErrorMesage, setFaceBookErrorMesage] = useState('');
  const [youtubeErrorMesage, setYoutubeErrorMesage] = useState('');
  const [twitterErrorMesage, setTwitterErrorMesage] = useState('');
  const [linkedErrorMesage, setLinkedErrorMesage] = useState('');

  function sentDataToFireBase() {
    console.log("button clicked");
    console.log("userFacebookLink",userFacebookLink);
    console.log("userInstagramLink",userInstagramLink);
    console.log("userYoutubeLink",userYoutubeLink);
    console.log("useTwitterLink",useTwitterLink);
    console.log("useLinkedInLink",useLinkedInLink);


    var p = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    // var p = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    // var d = /^\s*$/;
    var q =  '';
    if (!userFacebookLink.match(userFacebookLink === '' ? '' : p) || !userInstagramLink.match(userInstagramLink === '' ? '' : p) || !userYoutubeLink.match(userYoutubeLink === '' ? '' : p) || !useTwitterLink.match(useTwitterLink === '' ? '' : p) || !useLinkedInLink.match(useLinkedInLink === '' ? '' : p)) {
    // if (!userFacebookLink.match( p) || !userInstagramLink.match( p) || !userYoutubeLink.match( p) || !useTwitterLink.match(p) || !useLinkedInLink.match( p)) {
      console.log('==== something not match..  =====');
      instagram_url_validation();
      facebook_url_validation();
      youtube_url_validation();
      twitter_url_validation();
      linkedIn_url_validation();
    }
    else {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;
      sentUsernsme(user);
      nextButtonClicked();
      console.log("next button clicked");
    }
    return;
  }

  function facebook_url_validation() {
    var p = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    if (userFacebookLink.match(userFacebookLink === '' ? '' : p)) { setFaceBookErrorMesage("") } else {
      setFaceBookErrorMesage(" link is not valid ");
    }
  }
  function instagram_url_validation() {
    var p = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    if (userInstagramLink.match(userInstagramLink === '' ? '' : p)) { setInstaErrorMesage("") } else {
      setInstaErrorMesage(" link is not valid ");
    }
  }
  function youtube_url_validation() {
    var p = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    if (userYoutubeLink.match(userYoutubeLink === '' ? '' : p)) { setYoutubeErrorMesage("") } else {
      setYoutubeErrorMesage(" link is not valid ");
    }
  }
  function twitter_url_validation() {
    var p = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    if (useTwitterLink.match(useTwitterLink === '' ? '' : p)) { setTwitterErrorMesage("") } else {
      setTwitterErrorMesage(" link is not valid ");
    }
  }
  function linkedIn_url_validation() {
    var p = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    if (useLinkedInLink.match(useLinkedInLink === '' ? '' : p)) { setLinkedErrorMesage("") } else {
      setLinkedErrorMesage(" link is not valid ");
    }
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
                <div className="error-message">
                  <p>FaceBook</p>
                  <div className="error-Text">
                    <p>{facebookErrorMesage}</p>
                  </div>
                </div>
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
                <div className="error-message">
                  <p>Instagram</p>
                  <div className="error-Text">
                    <p>{instaErrorMesage}</p>
                  </div>
                </div>
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
                <div className="error-message">
                  <p>Youtube</p>
                  <div className="error-Text">
                    <p>{youtubeErrorMesage}</p>
                  </div>
                </div>
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
                <div className="error-message">
                  <p>Twitter</p>
                  <div className="error-Text">
                    <p>{twitterErrorMesage}</p>
                  </div>
                </div>
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
                <div className="error-message">
                  <p>LinkedIn</p>
                  <div className="error-Text">
                    <p>{linkedErrorMesage}</p>
                  </div>
                </div>
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
