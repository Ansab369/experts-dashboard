import React from "react";
import './complete.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo  } from '@fortawesome/free-solid-svg-icons';


function Completestepper() {

  return (
    <div className="ComponentA">
        <div className="infotext">
            <FontAwesomeIcon className="icon7" icon= {faCircleInfo} />
            <p>Completed</p>
        </div>
        <div className="Container" >
        {/* //! */}
        <div  className="social-container">
           <div>
               {/* //!  { 1 } */}
               <div className="textfieldtitle">
                   <p>Thanks for Creating totto Link,
                   </p>
               </div>
            </div>
       </div>
        </div>
    </div>
  );
}

export default Completestepper;
