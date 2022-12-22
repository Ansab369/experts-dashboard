import React ,{useState , useEffect} from "react";
import './videos.css';
import YoutubeEmbed from "./YoutubeEmbed";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function Videos({data}) {

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
                        <h1 className='gradient__text'> {data.videoTitle} </h1>
                        <p>{data.videoAbout}</p>
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