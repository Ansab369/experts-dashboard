import React from "react";
import './video.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, } from '@fortawesome/free-solid-svg-icons';

function Video({ updateField, formData }) {

  return (
    <div className="ComponentA">
      <div className="infotext">
        <FontAwesomeIcon className="icon7" icon={faCircleInfo} />
        <p>Add details your featured session With Totto Learning</p>
      </div>
      <div className="Container" >
        {/* //! */}
        <div className="social-container">
          <div>
 {/* //! videoTitle */}
            <div className="textfieldtitle">
              <p>Title</p>
            </div>
            <div className="textfieldSocial2">
              <input type="text" id="lname" name="lname" placeholder="Featured Session Title" value={formData['videoTitle']} onChange={(e) => updateField('videoTitle', e.target.value)}></input>
            </div>
            {/* //!  about */}
            <div className="textfieldtitle">
              <p>About</p>
            </div>
            <div className="textfieldSocial2">
              <textarea rows="3" cols="45" name="description" placeholder="" value={formData['videoAbout']} onChange={(e) => updateField('videoAbout', e.target.value)}>
              </textarea>
            </div>
            {/* //!  { 4 } */}
            <div className="textfieldtitle">
              <p>Link</p>
            </div>
            <div className="textfieldSocial2">
              <input type="text" id="lname" name="lname" placeholder="Featured Session Link" value={formData['videoLink']} onChange={(e) => updateField('videoLink', e.target.value)}></input>
            </div>
          </div>
        </div>
        {/* //!  add more button */}
        <div className="socialbutton">
          <button className="button2">Add More</button>
        </div>
      </div>
    </div>
  );
}

export default Video;
