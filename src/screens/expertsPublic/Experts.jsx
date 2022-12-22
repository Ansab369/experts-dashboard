import React from 'react';
import './Experts.css';
import { useState, useEffect } from "react";
import { Navbar, Header, Social, Session, Videos, Connect, Footer } from './containers';

import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HashLoader from "react-spinners/HashLoader";

const Experts = () => {
  const [data, setData] = useState();
  
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
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (docSnap.exists()) {
      setData(data);
    } else {
      console.log("No such document!");
    }
  }





  if(data==null){
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
        width: "100%",
      }}
      >
      <HashLoader color="#8B77EE" />
      </div>
    );
  }




  return (
    <div className='Experts' >
      <div className='curve_background'>
        <Navbar />
        <Header data={data}/>
      </div>
      <Social data={data}/>
      <Session data={data}/>
      <Videos data={data}/>
      <Connect data={data} />
      <Footer />
    </div>
  )
}


export default Experts



//!  [1]  create header  