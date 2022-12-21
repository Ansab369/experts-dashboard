import React, { useState, useEffect } from "react";
import './session.css';
import sesionThumbnail from '../../../../assets/expertsAssets/sessionThumbnail.png';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { auth, db } from "../../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Session() {
  const [sessionTitle, setSessionTitle] = useState();
  const [sessionAbout, setSessionAbout] = useState();

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
      setSessionTitle(data.sessionTitle);
      setSessionAbout(data.sessionAbout);
    } else {
      console.log("No such document!");
    }
  }

  return (
    <>
      <div className="maindiv">
        <h5 className="heading5">FEATURED SESSION</h5>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper">
          <SwiperSlide>
            <div className="featured-session">
              <div className='swiper-image'>
                <img src={sesionThumbnail} alt='thumbnail' />
              </div>
              <div className='session-content'>
                <h1 className='gradient__text'>{sessionTitle}</h1>
                <p>{sessionAbout}</p>
                <div className='session-content-button'>
                  <button type='button'>Explore</button>
                </div>
              </div>
            </div>
          </SwiperSlide>

        </Swiper>
      </div>
    </>

  );
}

export default Session;


