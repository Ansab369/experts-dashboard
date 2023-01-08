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
    // console.log("data sessionData",data);
    const validationSuccess= validateForm();
    if(validationSuccess!==true){
      return false;
    }




    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid);
    sentUsernsme(user);
    nextButtonClicked();
    return;
  }

  const [errors, setErrors] = useState([]);

  function validateForm(){
    let flag=true;
    const formErrors =[]
    videodata.forEach(row => { 
      const rowErrors = {};
      const link= row.link;
      const title= row.title;
      const about= row.about;
      var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if(!link.match(p)){
        rowErrors.link="Link not valid";
        flag=false;
      }
      if(title===''){
        rowErrors.title="Enter title";
        flag=false;
      }
      if(about===''){
        rowErrors.about="Enter about video";
        flag=false;
      }
      formErrors.push(rowErrors);
      setErrors(formErrors);
     } )
    return flag;
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
            <Form errors={errors[i]??{}} key={i} videodata={e} onUpdateField={(field, value) => { videodata[i][field] = value; setVideoData([...videodata]) }} onDelete={() => deleteRow(i)} />

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

function Form({ videodata, onUpdateField, onDelete,errors }) {
  return <div className="social-container">
    <div>
      {/* //! videoTitle */}
      <div className="textfieldtitle top-Padding">
        <FontAwesomeIcon className="icon49" icon={faTrash} onClick={onDelete} />
        <div className="error-message">
        <p>Title</p>
        <div className="error-Text">
            <p>{errors.title}</p>
          </div>
      </div>
      </div>
      <div className="textfieldSocial2">
        <input type="text" id="lname" name="lname" placeholder="Featured Session Title" value={videodata.title} onChange={(e) => onUpdateField('title', e.target.value)}></input>
      </div>
      {/* //!  about */}
      <div className="textfieldtitle">
      <div className="error-message">
        <p>About</p>
        <div className="error-Text">
            <p>{errors.about}</p>
          </div>
      </div>
      </div>
      <div className="textfieldSocial2">
        <textarea rows="3" cols="45" name="description" placeholder="" value={videodata.about} onChange={(e) => onUpdateField('about', e.target.value)} >
        </textarea>
      </div>
      {/* //!  { 4 } */}
      <div className="textfieldtitle">
      <div className="error-message">
        <p>Link</p>
        <div className="error-Text">
            <p>{errors.link}</p>
          </div>
      </div>
      </div>
      <div className="textfieldSocial2">
        <input type="text" id="lname" name="lname" placeholder="Featured Session Link" value={videodata.link} onChange={(e) => onUpdateField('link', e.target.value)} ></input>
      </div>
    </div>
  </div>
}
export default Video;
