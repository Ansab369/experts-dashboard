import React from "react";
import './social.css';
import { Facebook, Instagram, Twitter, Youtube, LinkedIn } from './import.js';

function Social({ data }) {

  return (
    <div className="social">
      <p>CHECK OUT MY</p>
      <div className="social-container-1">
        <a href={data.socialMediaFacebook}><div style={data.socialMediaFacebook === "" ? { display: "none" } : { display: "flex" }} >
          <img src={Facebook} alt="icon" />
        </div>
        </a>
        <a href={data.socialMediaInstagram} ><div style={data.socialMediaInstagram === "" ? { display: "none" } : { display: "flex" }} >
          <img src={Instagram} alt="icon" />
        </div></a>
        <a href={data.socialMediaTwitter}><div style={data.socialMediaTwitter === "" ? { display: "none" } : { display: "flex" }}>
          <img src={Twitter} alt="icon" />
        </div></a>
        <a href={data.socialMediaYoutube}><div style={data.socialMediaYoutube === "" ? { display: "none" } : { display: "flex" }}>
          <img src={Youtube} alt="icon" />
        </div></a>
        <a href={data.socialMediaLinkedIn}><div style={data.socialMediaLinkedIn === "" ? { display: "none" } : { display: "flex" }}>
          <img src={LinkedIn} alt="icon" />
        </div></a>
      </div>
    </div>
  );
}

export default Social;