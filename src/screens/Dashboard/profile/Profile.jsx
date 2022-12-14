import React  from "react";
import './profile.css';
import userimage from '../../../assets/userimage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare ,faCopy} from '@fortawesome/free-solid-svg-icons';
import { Link  } from 'react-router-dom';


function Profile() {
  return (
    <div className="profile">
         <div className="header section__padding">
      <div className="header-photo-section">
          <div className="header-image">
            <img src= {userimage} alt='user'/>
            </div>
      </div>
      <div className="header-user11">
        <div className="header-user-details-17">
          <h1>Thara Shenoy</h1>
          <div className="header-user-data">
                <p>Parenting Mentor,</p>
                <p>Mentor</p>
          </div>
          <p className><FontAwesomeIcon className="editIcon" icon= {faPenToSquare} />Edit Bio</p>
        </div>
      </div>
    </div>
    <div className="preview-web">
      <div className="preview-1">
        <div className="preview-2">
          <p className="preview-p1">tottolearning.com/experts/tharashenoy</p>
          <div className="copy-preview">
          <FontAwesomeIcon className="copyIcon" icon= {faCopy} />
          <button className="btn">
          <Link to='/experts'> Preview</Link>
                </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Profile;  