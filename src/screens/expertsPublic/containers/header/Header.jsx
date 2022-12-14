import React  from "react";
import { useState } from "react";
import './header.css';
import userimage from '../../../../assets/expertsAssets/userimage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot,faBuilding } from '@fortawesome/free-solid-svg-icons';


function Header() {

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="header section__padding">
      <div className="header-photo-section1">     
           <div className="header-image1">
             <span>
               <div className="border1">
                 <img src= {userimage} alt='user'/>
                </div>
              </span>
            </div>
      </div>




      <div className="header-user">
        <div className="header-user-details-1">
          <h1>Thara Shenoy</h1>
          <div className="header-user-location">
                <p><FontAwesomeIcon icon={faLocationDot} /> Coimbatore, Tamil Nadu</p>
                <p><FontAwesomeIcon icon={faBuilding} /> Tot Trails by Thara</p>
          </div>
          <p>Lorem ipsum dolor sit amet, conseiusmod teut labore Ut en veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occum.</p>
        </div>
        <div className="header-user-details">
             <div className="header-user-details-tab">
                <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(1)}>Expert In</div>
                <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={()=>toggleTab(2)}>Education</div>
              </div>
              {/* //! */}
        </div>
                <div  className={toggleState === 1 ? "content  active-content" : "content"}>
                  
                     <div className="education">
                        <p>Parent Coach</p>
                     </div>
                     <div className="education">
                        <p>Parent parenting web coach Coach</p>
                     </div>
                     <div className="education">
                        <p>Parent Coach</p>
                     </div>
                </div>
                <div  className={toggleState === 2 ? "content  active-content" : "content"}>
                     <div className="education" >
                      <p>demo</p>
                     </div>
                     <div className="education" >
                      <p>demo coach developer</p>
                     </div>
                </div>
      </div>
    </div>
  );
}

export default Header;

// https://reactjsexample.com/a-headless-and-flexible-tabs-built-with-react-hooks/