import React,{useState,useEffect} from "react";
import './connect.css';
import connectBubble from '../../../../assets/expertsAssets/bubble.png';
import connectCartoon from '../../../../assets/expertsAssets/connectCartoon.png';

import { auth, db } from "../../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Connect() {

  const [userName, setUserName] = useState();
  const [expertIn, setExpertIn] = useState();

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
      setExpertIn(data.expertsIn);
    } else {
      console.log("No such document!");
    }
  }

  return (
    <div className="connect">
      <div className="header-photo-section">
        <div className="headerimage">
          <img src={connectBubble} alt='user' />
          <div class="text-1"><p>Learn From Experts</p></div>
          <div class="text-2"><h1>Ask.</h1></div>
          <div class="text-3"><p>Ask a question to {userName} </p></div>
          <div className='connect-content-button'>
            <button type='button'>Ask a Question</button>
          </div>
        </div>
      </div>
      <div className="header-user">
        <div className="header-user-details-1">
          <div className="headerimage"><img src={connectCartoon} alt='user' /></div>
        </div>
      </div>
    </div>
  );
}

export default Connect;