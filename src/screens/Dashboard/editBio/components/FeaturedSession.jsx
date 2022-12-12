import React  from "react";
// import './editBio.css';
// import { Link} from 'react-router-dom';
import EditBioNavBar from '../EditBioNavBar'
import Session from '../../../Stepper/Components/Session/Session';
import DashBoardNavBoard from '../../DashBoardNavBar';


function FeaturedSession() {
  return (
    <div className="featuredSession">
      <DashBoardNavBoard/>
             <EditBioNavBar/>
             <Session/> 
  </div>
  );
}

export default FeaturedSession;
