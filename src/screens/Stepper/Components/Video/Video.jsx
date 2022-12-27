import React, { useState, useEffect } from "react";
import './video.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { db, auth } from "../../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HashLoader from "react-spinners/HashLoader";

function Video({ currentStep, onBackIconClicked, nextButtonClicked }) {
  const steps = ["Bio", "Social", "Session", "Video"];
  const [videodata, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    addComponent();
  }, []);

  function addComponent() {
    // console.log("added component");
    // console.log(videodata);
    setVideoData(
      [...videodata, {
        'title': "",
        'about': "",
        'link': "",
      }]
    )

  }
  function deleteRow(e) {
    videodata.splice(e, 1)
    console.log(videodata)
    setVideoData([...videodata])
  }

  // !  use update methord..
  let sentUsernsme = async (user) => {
    try {
      const docRef = doc(db, 'users', user.uid);
      setDoc(docRef, {
        videoDatas: videodata,
      }, { merge: true });
    } catch (e) {

    }
  }

  async function sentDataToFireBase() {
    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;
    // const storage = getStorage();
    // const storageRef = ref(storage, `userProfile/${user.uid}/${profileImage.name}`);

    //  let snapshot =await uploadBytes(storageRef, profileImage);
    //  let url = await getDownloadURL(snapshot.ref) ;
    //  setUserUrl(url);
    //  sentUsernsme(user, url);
    const docRef = doc(db, 'users', user.uid);
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
          <p>Add details your featured session With Totto Learning</p>
        </div>
        <div className="Container" >
          {/* //! */}


          {videodata.map((e, i) => (
            <Form key={i} videodata={e} onUpdateField={(field, value) => { videodata[i][field] = value; setVideoData([...videodata]) }} onDelete={() => deleteRow(i)} />

          ))}
          {/* //!  add more button */}
          <div className="socialbutton">
            <button className="button2" onClick={addComponent}>Add More</button>
          </div>
        </div>
      </div>
      {/* //!   finish button */}
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

function Form({ videodata, onUpdateField, onDelete, }) {
  return <div className="social-container">
    <div>
      {/* //! videoTitle */}
      <div className="textfieldtitle top-Padding">
        <FontAwesomeIcon className="icon49" icon={faTrash} onClick={onDelete} />
        <p>Title</p>
      </div>
      <div className="textfieldSocial2">
        <input type="text" id="lname" name="lname" placeholder="Featured Session Title" value={videodata.title} onChange={(e) => onUpdateField('title', e.target.value)}></input>
      </div>
      {/* //!  about */}
      <div className="textfieldtitle">
        <p>About</p>
      </div>
      <div className="textfieldSocial2">
        <textarea rows="3" cols="45" name="description" placeholder="" value={videodata.about} onChange={(e) => onUpdateField('about', e.target.value)} >
        </textarea>
      </div>
      {/* //!  { 4 } */}
      <div className="textfieldtitle">
        <p>Link</p>
      </div>
      <div className="textfieldSocial2">
        <input type="text" id="lname" name="lname" placeholder="Featured Session Link" value={videodata.link} onChange={(e) => onUpdateField('link', e.target.value)} ></input>
      </div>
    </div>
  </div>
}
export default Video;
