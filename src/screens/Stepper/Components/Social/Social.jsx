import React from "react";
import "react-widgets/styles.css";
import './social.css';
// import DropdownList from "react-widgets/DropdownList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


function Social({ updateField, formData }) {


  return (
    <div className="ComponentA">
      <div className="infotext">
        <FontAwesomeIcon className="icon7" icon={faCircleInfo} />
        <p>Add your Social Media Links</p>
      </div>
      <div className="Container" >
        {/* //! */}
        <div className="social-container">
          <div>
            {/* //!  1 */}
            <div className="textfieldtitle">
              <p>FaceBook</p>
            </div>
            <div className="textfieldSocial2">
              <textarea rows="1" cols="45" name="description" placeholder="Facebook Profile Link" value={formData['socialMediaFacebook']} onChange={(e) => updateField('socialMediaFacebook', e.target.value)}>
              </textarea>
            </div>
            {/* //! 2  */}
            <div className="textfieldtitle">
              <p>Instagram</p>
            </div>
            <div className="textfieldSocial2">
              <textarea rows="1" cols="45" name="description" placeholder="Instagram Profile Link" value={formData['socialMediaInstagram']} onChange={(e) => updateField('socialMediaInstagram', e.target.value)}>
              </textarea>
            </div>
            {/* //! 3*/}
            <div className="textfieldtitle">
              <p>Youtube</p>
            </div>
            <div className="textfieldSocial2">
              <textarea rows="1" cols="45" name="description" placeholder="Youtube Link" value={formData['socialMediaYoutube']} onChange={(e) => updateField('socialMediaYoutube', e.target.value)}>
              </textarea>
            </div>
            {/* //! 4 */}
            <div className="textfieldtitle">
              <p>Twitter</p>
            </div>
            <div className="textfieldSocial2">
              <textarea rows="1" cols="45" name="description" placeholder="Twitter Profile Link" value={formData['socialMediaTwitter']} onChange={(e) => updateField('socialMediaTwitter', e.target.value)}>
              </textarea>
            </div>
            {/* //! 5 */}
            <div className="textfieldtitle">
              <p>LinkedIn</p>
            </div>
            <div className="textfieldSocial2">
              <textarea rows="1" cols="45" name="description" placeholder="LinkedIn Profile Link" value={formData['socialMediaLinkedIn']} onChange={(e) => updateField('socialMediaLinkedIn', e.target.value)}>
              </textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Social;
