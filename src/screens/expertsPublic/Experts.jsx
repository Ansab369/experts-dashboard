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
  const [error, setError404] = useState(false);
  const obj = useParams();

  useEffect(() => {
    fetchUserDataslug();
  }, []);

  let fetchUserDataslug = async (uid) => {
    const q = query(collection(db, 'users'), where('linkName', '==', obj.slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size !== 0) {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());

        setData(doc.data());
        console.log(doc.data().sessionData);

      });
    } else {
      setData('');
      setError404(true);
    }
  }

  if (error) {
    return (
      <div
        style={{
          flexDirection: 'column',
          color: '#8B77EE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          width: "100%",
        }}>
        <h1 style={{ textShadow: '2px 2px #c2c6cc', fontSize: '50px' }}>Error 404</h1>
        <span style={{ width: '120px', height: '5px', background: '#c2c6cc', borderRadius: '100px', margin: '10px' }}></span>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Page Not Found</p>
      </div>)
  }


  if (data == null) {
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
        <Header data={data} />
      </div>
      {data.hasOwnProperty('socialMediaFacebook' || 'socialMediaInstagram' || 'socialMediaLinkedIn' || 'socialMediaTwitter' || 'socialMediaYoutube') ?
        data.socialMediaFacebook === "" && data.socialMediaInstagram === "" && data.socialMediaLinkedIn === "" && data.socialMediaTwitter === "" && data.socialMediaYoutube === "" ? '' : <Social data={data} /> : ("")}
      {data.hasOwnProperty('sessionData') ? data.sessionData.length !== 0 ? <Session data={data} /> : '' : ''}
      { data.hasOwnProperty('videoDatas') ? data.videoDatas.length !== 0 ? <Videos data={data} /> : '' : ''}
      <Connect data={data} />
      <Footer />
    </div>
  )
}


export default Experts