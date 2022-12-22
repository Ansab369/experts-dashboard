import React from "react";
import { useState } from "react";
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faBuilding } from '@fortawesome/free-solid-svg-icons';


function Header({data}) {

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
              <img src={data.userImageUrl} alt='user' />
            </div>
          </span>
        </div>
      </div>
      <div className="header-user">
        <div className="header-user-details-1">
          <h1>{data.firstName+" "+data.lastName}</h1>
          <div className="header-user-location">
            <p><FontAwesomeIcon icon={faLocationDot} /> {data.location}</p>
            <p><FontAwesomeIcon icon={faBuilding} /> {data.organization}</p>
          </div>
          <p>{data.about}</p>
        </div>
        <div className="header-user-details">
          <div className="header-user-details-tab">
            <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>Expert In</div>
            <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>Education</div>
          </div>
 {/* //!  expertIn */}
        </div>
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
          {(data.expertsIn).map((e) => {
            return <div className="education">
              <p>{e}</p>
            </div>
          })}
        </div>
        <div className={toggleState === 2 ? "content  active-content" : "content"}>
          <div className="education" >
            <p>{data.education}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;