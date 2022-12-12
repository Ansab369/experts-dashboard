import React  from "react";
import './profile.css';
// import { useState } from "react";
import userimage from '../../../assets/userimage.png';
// import main from '../../../assets/main.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare ,faCopy} from '@fortawesome/free-solid-svg-icons';


function Profile() {
  return (
    <div className="profile">
         <div className="header section__padding">
      <div className="header-photo-section">
          <div className="header-image">
            <img src= {userimage} alt='user'/>
            </div>
      </div>


      <div className="header-user">
        <div className="header-user-details-1">
          <h1>Welcome, Thara Shenoy</h1>
          <div className="header-user-data">
                <p>Parenting Mentor,</p>
                <p>Mentor</p>
          </div>
          <p><FontAwesomeIcon className="editIcon" icon= {faPenToSquare} />Edit Bio</p>
        </div>

      </div>
    </div>

    <div className="preview-web">
      <div className="preview-1">
        <div className="preview-2">
          <p className="preview-p1">https://tottolearning.com/experts/tharashenoy</p>
          <div className="copy-preview">
          <FontAwesomeIcon className="copyIcon" icon= {faCopy} />
          <button className="btn">
                   Preview
                </button>
          </div>
          
        </div>
      </div>
    </div>
         
         
  </div>
  );
}

export default Profile;
