import React from "react";
import './session.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


function Session({ updateField, formData }) {

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
            {/* //!  { 1 } */}
            <div className="textfieldtitle">
              <p>Title</p>
            </div>
            <div className="textfieldSocial2">
              <input type="text" id="lname" name="lname" placeholder="Featured Session Title" value={formData['sessionTitle']} onChange={(e) => updateField('sessionTitle', e.target.value)}></input>
            </div>
            {/* //!  { 2 } */}
            <div className="textfieldtitle">
              <p>Image</p>
            </div>
            <div className="image-button1">
              <button className="button5">Select Image</button>
            </div>
            {/* //!  about */}
            <div className="textfieldtitle">
              <p>About</p>
            </div>
            <div className="textfieldSocial2">
              <textarea rows="3" cols="45" name="description" placeholder="Short Discription About Your Session" value={formData['sessionAbout']} onChange={(e) => updateField('sessionAbout', e.target.value)}>
              </textarea>
            </div>
            {/* //!  { 4 } */}
            <div className="textfieldtitle">
              <p>Link</p>
            </div>
            <div className="textfieldSocial2">
              <input type="text" id="lname" name="lname" placeholder="Featured Session Link" value={formData['sessionLink']} onChange={(e) => updateField('sessionLink', e.target.value)}></input>
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

export default Session;
