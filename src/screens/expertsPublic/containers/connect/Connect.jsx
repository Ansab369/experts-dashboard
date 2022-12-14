import React from "react";
import './connect.css';
import connectBubble from '../../../../assets/expertsAssets/bubble.png';
import connectCartoon from '../../../../assets/expertsAssets/connectCartoon.png';



function Connect() {
  return (
    // <div className="header section__padding1">
    <div className="connect">
    <div className="header-photo-section">
        <div className="headerimage">
          <img  src= {connectBubble} alt='user'/>
          <div class="text-1"><p>Learn From Experts</p></div>
          <div class="text-2"><h1>Ask Thara.</h1></div>
          <div class="text-3"><p>Ask a question to Thara Shenoy - Occupational Therapist</p></div>
          <div className='connect-content-button'>
                          <button type='button'>Ask a Question</button>
         </div>


        </div>
    </div>

    <div className="header-user">
      <div className="header-user-details-1">
      <div className="headerimage"><img src= {connectCartoon} alt='user'/></div>
      </div>
    </div>
  </div>
  );
}

export default Connect;