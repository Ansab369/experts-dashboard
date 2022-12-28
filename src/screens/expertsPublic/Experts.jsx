import React from 'react';
import './Experts.css';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Navbar, Header, Social, Session, Videos, Connect, Footer } from './containers';

import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import HashLoader from "react-spinners/HashLoader";

const Experts = () => {
  const [data, setData] = useState();
  const obj= useParams();
    console.log(obj.slug);

  
  useEffect(() => {
    // const q = query(collection(db, "cities"), where("capital", "==", true));
    fetchUserDataslug();

    


    // const user = auth.currentUser;
    // console.log(user)
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     const uid = user.uid;
    //     console.log(uid);
    //     // fetchUserData(uid);
    //   } else {

    //   }
    // });
  }, []);

  let fetchUserDataslug = async (uid) => {
  
    const q = query(collection(db,'users'), where('linkName', '==', obj.slug));
    console.log('q is =====',q)
    // const usersRef = collection(db, 'users');
    // const q = query(usersRef, where('linkName', '==', obj));
    const querySnapshot = await getDocs(q);
    // const data = querySnapshot.data();
    console.log('querySnapshot ======',querySnapshot);
   if(querySnapshot){
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log('fffggggggggggggggggggggggg')
      console.log(doc.id, " => ", doc.data());
      
      setData(doc.data());
    });}else{
      console.log('querySnapshot is empty')
    }



    // const docRef = doc(db, 'users', uid);
    // const docSnap = await getDoc(docRef);
    // const data = docSnap.data();
    // if (docSnap.exists()) {
    //   setData(data);
    // } else {
    //   console.log("No such document!");
    // }
  }
  // let fetchUserData = async (uid) => {
  //   const docRef = doc(db, 'users', uid);
  //   const docSnap = await getDoc(docRef);
  //   const data = docSnap.data();
  //   if (docSnap.exists()) {
  //     setData(data);
  //   } else {
  //     console.log("No such document!");
  //   }
  // }





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
      {/* {data.socialMediaInstagram ==='' && data.socialMediaFacebook ==='' && data.socialMediaLinkedIn ==='' &&data.socialMediaTwitter===''&&data.socialMediaYoutube===''? '':<Social data={data}/>} */}
      {data.socialMediaFacebook === "" &&  data.socialMediaInstagram === "" &&  data.socialMediaLinkedIn === "" &&  data.socialMediaTwitter === "" &&  data.socialMediaYoutube === ""  ? '':<Social data={data}/>}
      {data.sessionData===[]? <Session data={data}/>:''}
      {data.videoDatas===[]? <Videos data={data}/>:''}
      <Connect data={data} />
      <Footer />
    </div>
  )
}


export default Experts



//!  [1]  create header  