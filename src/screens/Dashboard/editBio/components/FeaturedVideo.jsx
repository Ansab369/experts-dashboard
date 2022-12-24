import React, { useState, useEffect } from "react";
import './basic.css';
// import { Link} from 'react-router-dom';
import EditBioNavBar from '../EditBioNavBar'
// import Video from '../../../Stepper/Components/Video/Video';
import DashBoardNavBoard from '../../DashBoardNavBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo ,faTrash} from '@fortawesome/free-solid-svg-icons';

import { db, auth } from "../../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function FeaturedVideo() {
  const [videodata, setVideoData] = useState([]);

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
  function sentModifiedDetailsToFirebase() {
    const auth = getAuth();
    const user = auth.currentUser;
    // sentUsernsme(user);
    sentDataToFireBase();
    return;
  }
  async function sentDataToFireBase() {
    const auth = getAuth();
    const user = auth.currentUser;
    
    const docRef = doc(db, 'users', user.uid);
      
    setDoc(docRef, {
      videoDatas: videodata,
    }, { merge: true });
    return;
  }
  let fetchUserData = async (uid) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    const fetchdata = docSnap.data();
    if (docSnap.exists()) {
      console.log(fetchdata)
      setVideoData(fetchdata.videoDatas);
      console.log(fetchdata.videoDatas)

    } else {
      console.log("No such document!");
    }
  }

  function deleteRow(e) {
    videodata.splice(e, 1)
    console.log(videodata)
    setVideoData([...videodata])
  }
  function addComponent() {
    console.log(videodata);
    setVideoData(
      [...videodata, {
        'title': "",
        'about': "",
        'link': "",
      }]
    )
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


      
        {videodata.map((e, i) => (
            <Form key={i} videodata={e} onUpdateField={(field, value) => { videodata[i][field] = value; setVideoData([...videodata]) }} onDelete={() => deleteRow(i)} />

          ))}

<div className="socialbutton">
            <button className="button2" onClick={addComponent}>Add More</button>
          </div>





        {/* //!  add more button */}
      </div>
    </div>
      {/* //! */}
      <div className="dashbord-save-btn">
        <button className="btn btn-width" onClick={sentModifiedDetailsToFirebase} >Save</button>
      </div>
    </div>
  );
}
function Form({videodata,    onUpdateField,  onDelete,}){
  return <div className="social-container">
  <div>
{/* //! videoTitle */}
    <div className="textfieldtitle top-Padding">
    <FontAwesomeIcon className="icon49" icon={faTrash}  onClick={onDelete}/>
      <p>Title</p>
    </div>
    <div className="textfieldSocial2">
      <input type="text" id="lname" name="lname" placeholder="Featured Session Title" value={videodata.title}  onChange={(e) => onUpdateField('title', e.target.value)}></input>
    </div>
    {/* //!  about */}
    <div className="textfieldtitle">
      <p>About</p>
    </div>
    <div className="textfieldSocial2">
      <textarea rows="3" cols="45" name="description" placeholder="" value={videodata.about}  onChange={(e) => onUpdateField('about', e.target.value)} >
      </textarea>
    </div>
    {/* //!  { 4 } */}
    <div className="textfieldtitle">
      <p>Link</p>
    </div>
    <div className="textfieldSocial2">
      <input type="text" id="lname" name="lname" placeholder="Featured Session Link" value={videodata.link}  onChange={(e) => onUpdateField('link', e.target.value)} ></input>
    </div>
  </div>
</div>
}
export default FeaturedVideo;
