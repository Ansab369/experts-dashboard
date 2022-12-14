import React from "react";
import './social.css';
import {Facebook, Instagram , Twitter,Youtube} from './import.js';


function Social() {
  return (
    <div className="social">
     <p>CHECK OUT MY</p>
     <div className="social-container-1">
        <div >
            <img src={Facebook} alt="icon" />
        </div>
        <div >
            <img src={Instagram} alt="icon" />
        </div>
        <div >
            <img src={Twitter} alt="icon" />
        </div>
        <div >
            <img src={Youtube} alt="icon" />
        </div>
     </div>
    </div>
  );
}

export default Social;