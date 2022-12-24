import React ,{useState , useEffect} from "react";
import './videos.css';
// import YoutubeEmbed from "./YoutubeEmbed";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function Videos({data}) {

  let videoData= data.videoDatas;
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
        {videoData.map((e)=>(
              <SwiperSlide>
              <div className="featured-video">
                    <div className='swiper-image'>
                      <div className="video-session">
                        <YoutubeEmbeddded className='iframe-youtube' url={`${e.link}`}/>
                      </div>
                    </div>
                <div className='sessioncontent'>
                    <h1 className='gradient__text'> {e.title} </h1>
                    <p>{e.about}</p>
                    <div className='session-content-button'>
                      <button type='button'>Watch</button>
                    </div>
                </div>  
            </div>
    </SwiperSlide> 
        ))}
      </Swiper>
      </div>
    </>
  );
}

export default Videos;

export const YoutubeEmbeddded = ({url,...props})=>{
  function getVideoId(url) {
    var urlObject = new URL(url);
    if (urlObject.hostname === "youtu.be") {
      return urlObject.pathname.slice(1);
    }
    var queryString = urlObject.search;
    var queryParams = new URLSearchParams(queryString);
    return queryParams.get("v");
  }


  return <iframe 
    // width={100} height={500}
    // width={1000}
    src={`https://www.youtube.com/embed/${getVideoId(url)}?feature=oembed`}
    allowfullscreen
    {...props}
    >
</iframe> 
}