import React from "react";
import './videos.css';
import YoutubeEmbed from "./YoutubeEmbed";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";


function Videos() {
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
                           <YoutubeEmbed embedId="zpmdzZFsKdA" />
                          </div>
                        </div>
                    <div className='sessioncontent'>
                        <h1 className='gradient__text'>Writing Without Tears!</h1>
                        <p>Learn how to prepare your child to write better!.</p>
                        <div className='session-content-button'>
                          <button type='button'>Watch</button>
                        </div>
                    </div>  
                </div>
        </SwiperSlide>
        <SwiperSlide>
                  <div className="featured-video">
                        <div className='swiper-image'>
                          <div className="video-session">
                           <YoutubeEmbed embedId="HHXcTBxji_c" />
                          </div>
                        </div>
                    <div className='sessioncontent'>
                        <h1 className='gradient__text'>Forcing your child to write?</h1>
                        <p>Learn how to prepare your child to write better!.</p>
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