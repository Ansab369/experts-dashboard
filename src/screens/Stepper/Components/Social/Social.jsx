import React  from "react";
import "react-widgets/styles.css";
import './social.css';
import DropdownList from "react-widgets/DropdownList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


function Social() {

    
  return (
    <div className="ComponentA">
    <div className="infotext">
        <FontAwesomeIcon className="icon7" icon= {faCircleInfo} />
        <p>Add your Social Media Links</p>
    </div>
    <div className="Container" >
    {/* //! */}





    <div  className="social-container">
       
       <div>
          
           {/* //!  { 1 } */}
           <div className="textfieldtitle">
               <p>Title</p>
           </div>
           <div className="textfieldSocial2">
                      <DropdownList className="dropdowm"
                                defaultValue="Instagram"
                                data={["Instagram", "Facebook", "Twitter", "Whatsapp"]}/>
                  {/* <input type="text" id="lname" name="lname"placeholder="Featured Session Title" ></input> */}
              </div>
              {/* //!  { 2 } */}
              {/* <div className="textfieldtitle">
                  <p>Media</p>
              </div>
               <div className="image-button1">
                   <button className="button5">Select Image</button>
              </div> */}
                {/* //!  about */}
                  <div className="textfieldtitle">
                  <p>Link</p>
                  </div>
                  
                    <div className="textfieldSocial2">
                    <textarea rows = "1" cols = "45" name = "description" placeholder="Social Media Link">
                     
                  </textarea>
                    </div>



           {/* //!  { 4 } */}

              {/* <div className="textfieldtitle">
               <p>Link</p>
           </div>
           <div className="textfieldSocial2">
                  <input type="text" id="lname" name="lname"placeholder="Featured Session Link" ></input>
              </div> */}
             
        </div>
        
   </div>
   {/* //!  add more button */}
   <div className="socialbutton">
        <button className="button2">Add More</button>
        </div>
       
  

    </div>
</div>
    // <div className="Social">
    //     <div className="infotext1">
    //         <FontAwesomeIcon className="icon27" icon= {faCircleInfo} />
    //!         <p>Add your Social Media Links</p>
    //     </div>
    //     <div className="Container1" >
    //         <div  className="social-container1">
    //             <div>
    //                 <div className="textfieldtitle">
    //  !                   <p>Media</p>
    //                 </div>
    // !                <div className="textfieldSocial2">
    //                      <DropdownList className="dropdowm"
    //                             defaultValue="Instagram"
    //                             data={["Instagram", "Facebook", "Twitter", "Whatsapp"]}/>
    //                 </div>
    //                 <div className="textfieldtitle">
    //                     <p>Link</p>
    //                 </div>
    //                 <div className="textfieldSocial2">
    //                        <input type="text" id="lname" name="lname"placeholder="Profile link" ></input>
    //                    </div>
    //              </div>
    //         </div>
    //         {/* //!  2   */}

    //    {/* //!  add more button */}
    //         <div className="socialbutton">
    //         <button className="button2">Add More</button>
    //         </div>

    //     </div>
    // </div>
  );
}

export default Social;
