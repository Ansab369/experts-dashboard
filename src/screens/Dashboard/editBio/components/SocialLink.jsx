import React  from "react";
import './basic.css';
// import { Link} from 'react-router-dom';
import EditBioNavBar from '../EditBioNavBar'
import Social from '../../../Stepper/Components/Social/Social';
import DashBoardNavBoard from '../../DashBoardNavBar';


function SocialLinks() {
  return (
    <div className="socialLinks">
      <DashBoardNavBoard/>
        <EditBioNavBar/>
        <Social/>
  </div>
  );
}

export default SocialLinks;
