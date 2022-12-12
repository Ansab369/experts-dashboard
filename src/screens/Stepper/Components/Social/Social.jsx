import React  from "react";
import "react-widgets/styles.css";
import './social.css';
import DropdownList from "react-widgets/DropdownList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo , faEnvelope ,faCaretDown } from '@fortawesome/free-solid-svg-icons';


function Social() {

    
  return (
    <div className="ComponentA">
        <div className="infotext">
            <FontAwesomeIcon className="icon7" icon= {faCircleInfo} />
            <p>Add your Social Media Links</p>
        </div>
        <div className="Container" >

            {/* //!   Add social  */}
            <div  className="social-container">
           
                <div>
                    <div className="textfieldtitle">
                        <p>Media</p>
                    </div>
                    <div className="textfieldSocial2">
                    <DropdownList className="dropdowm"
                                defaultValue="Instagram"
                                data={["Instagram", "Facebook", "Twitter", "Whatsapp"]}/>
                       </div>
                    <div className="textfieldtitle">
                        <p>Link</p>
                    </div>
                    <div className="textfieldSocial2">
                           <input type="text" id="lname" name="lname"placeholder="Profile link" ></input>
                       </div>
                      
                 </div>
                 
            </div>
            {/* //!  2   */}
            <div  className="social-container">
           
           <div>
               <div className="textfieldtitle">
                   <p>Media</p>
               </div>
               <div className="textfieldSocial2">
               <DropdownList className="dropdowm"
                           defaultValue="Facebook"
                           data={["Instagram", "Facebook", "Twitter", "Whatsapp"]}/>
                  </div>
               <div className="textfieldtitle">
                   <p>Link</p>
               </div>
               <div className="textfieldSocial2">
                      <input type="text" id="lname" name="lname"placeholder="Profile link" ></input>
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

export default Social;
