import React ,{useState , useEffect} from "react";
import './videos.css';
import YoutubeEmbed from "./YoutubeEmbed";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { auth, db } from "../../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Videos() {

  const [videoTitle, setVideoTitle] = useState();
  const [videoAbout, setVideoAbout] = useState();

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
      setVideoTitle(data.videoTitle);
      setVideoAbout(data.videoAbout);
    } else {
      console.log("No such document!");
    }
  }


  return (
    <>
    <div className="main">
      <h5 className="heading">FEATURED VIDEO</h5>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,}}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper">
        <SwiperSlide>
                  <div className="featured-video">
                        <div className='swiper-image'>
                          <div className="video-session">
                           <YoutubeEmbed embedId="zpmdzZFsKdA"/>
                          </div>
                        </div>
                    <div className='sessioncontent'>
                        <h1 className='gradient__text'> {videoTitle} </h1>
                        <p>{videoAbout}</p>
                        <div className='session-content-button'>
                          <button type='button'>Watch</button>
                        </div>
                    </div>  
                </div>
        </SwiperSlide> 
      </Swiper>
      </div>
    </>
  );
}

export default Videos;