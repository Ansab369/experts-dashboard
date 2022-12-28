import React ,{useState, useEffect} from "react";
import './profile.css';
import userimage from '../../../assets/userimage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare ,faCopy} from '@fortawesome/free-solid-svg-icons';
import { Link  } from 'react-router-dom';

import { auth, db} from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth ,onAuthStateChanged} from "firebase/auth";

import HashLoader from "react-spinners/HashLoader";


function Profile() {
  const[firstName,setFirstName] = useState();
  const[lastName,setlastName] = useState();
  // const[proffesion,setProffesion] = useState([]);
  const[userEmail,setEmail] = useState([]);
  const[linkName,setLinkName] = useState();
  const[userProfile,setUserProfile] = useState();
  const[isLoading,setIsloading] = useState(true);
  const [datas,setDatas]=useState();

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
        setDatas(data);
        setFirstName(data.firstName);
        setlastName(data.lastName);
        // setProffesion(data.expertsIn)
        setLinkName(data.linkName);
        setEmail(data.email);
        setUserProfile(data.userImageUrl);
        setIsloading(false);

        
        console.log("data is = :",data.firstName);
      } else {
        console.log("No such document!");
      }
  }

  if(isLoading===true){
    return (
      <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        width: "100%"
      }}
      >
      <HashLoader color="#36d7b7" />
      </div>
    );
  }
  return (
    <div className="profile">
         <div className="header section__padding">
          <div className="header-photo-section">
              <div className="header-image">
                <img src={userProfile} alt='user'/>
              </div>
          </div>
      <div className="header-user11">
        <div className="header-user-details-17">
          <h1>{firstName +" "+lastName}</h1>
            <div className="header-user-data">
              {/* {proffesion.map((e)=>{return <p>{e}</p>}) } */}
              <p>{userEmail}</p>
           </div>
           <Link to='/editbio/basicinfo'>  <p className><FontAwesomeIcon className="editIcon" icon= {faPenToSquare} />Edit Bio</p></Link>
        </div>
      </div>
    </div>
    <div className="preview-web">
      <div className="preview-1">
        <div className="preview-2">
          <p className="preview-p1">tottolearning.com/experts/{linkName}<FontAwesomeIcon className="copyIcon" icon= {faCopy} /></p>
          <div className="copy-preview">
            <Link to={`/experts/${datas.linkName}`}><button className="btn">
               Preview
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Profile;  