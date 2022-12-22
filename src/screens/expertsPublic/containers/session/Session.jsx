import React, { useState, useEffect } from "react";
import './session.css';
import sesionThumbnail from '../../../../assets/expertsAssets/sessionThumbnail.png';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function Session({data}) {

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
                <h1 className='gradient__text'>{data.sessionTitle}</h1>
                <p>{data.sessionAbout}</p>
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


