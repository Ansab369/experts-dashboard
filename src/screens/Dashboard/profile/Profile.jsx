import React ,{useState, useEffect} from "react";
import './profile.css';
import userimage from '../../../assets/userimage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare ,faCopy} from '@fortawesome/free-solid-svg-icons';
import { Link  } from 'react-router-dom';

import { auth, db} from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth ,onAuthStateChanged} from "firebase/auth";


function Profile() {
  const[userName,setUserName] = useState();
  const[proffesion,setProffesion] = useState([]);
  const[linkName,setLinkName] = useState();



  useEffect(() => {    
    const user=auth.currentUser;
    console.log(user)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        fetchUserData(uid);
      } else {
       
      }
    });
  },[]);

  let fetchUserData = async(uid) => {
      const auth = getAuth();
      const user = auth.currentUser;
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data(); 
      if (docSnap.exists()) {
        setUserName(data.username);
        setProffesion(data.expertsIn)
        setLinkName(data.linkName)
        // console.log("data is = :",data.expertsIn);
      } else {
        console.log("No such document!");
      }
  }


  return (
    <div className="profile">
         <div className="header section__padding">
          <div className="header-photo-section">
              <div className="header-image">
                <img src= {userimage} alt='user'/>
              </div>
          </div>
      <div className="header-user11">
        <div className="header-user-details-17">
          <h1>{userName}</h1>
            <div className="header-user-data">
              { proffesion.map((e)=>{return <p>{e}</p>}) }
           </div>
          <p className><FontAwesomeIcon className="editIcon" icon= {faPenToSquare} />Edit Bio</p>
        </div>
      </div>
    </div>
    <div className="preview-web">
      <div className="preview-1">
        <div className="preview-2">
          <p className="preview-p1">tottolearning.com/experts/{linkName}<FontAwesomeIcon className="copyIcon" icon= {faCopy} /></p>
          <div className="copy-preview">
            <button className="btn">
              <Link to='/experts'> Preview</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Profile;  