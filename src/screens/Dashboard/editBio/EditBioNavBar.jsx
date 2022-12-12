import React  from "react";
import './editBio.css';
import { Link, useLocation} from 'react-router-dom';


function EditBioNavBar() {
  const location = useLocation();
//   const path = window.location.pathname
  return (
    <div className="editBio">
          <div className="totto__navbar2">
                <div className= "totto__navbar-links-container4">
                        <p><Link to='/editbio/basicinfo' className= {location.pathname==='/editbio/basicinfo'?"totto__navbar-links-container3":"totto__navbar-links-container5"} >Basic </Link></p>
                        <p><Link to='/editbio/links' className= {location.pathname==='/editbio/links'?"totto__navbar-links-container3":"totto__navbar-links-container5"}>Links</Link></p>
                        <p><Link to='/editbio/session' className= {location.pathname==='/editbio/session'?"totto__navbar-links-container3":"totto__navbar-links-container5"} >Session</Link></p>
                        <p><Link to='/editbio/video'className= {location.pathname==='/editbio/video'?"totto__navbar-links-container3":"totto__navbar-links-container5"} >Videos</Link></p>
                </div>
         </div>
  </div>
  );
}
export default EditBioNavBar;
