import React  from "react";
import './basic.css';
// import { Link} from 'react-router-dom';
import EditBioNavBar from '../EditBioNavBar'
import Video from '../../../Stepper/Components/Video/Video';
import DashBoardNavBoard from '../../DashBoardNavBar';


function FeaturedVideo() {
  return (
    <div className="featuredVideo">
      <DashBoardNavBoard/>
       <EditBioNavBar/>
         <Video/>
  </div>
  );
}

export default FeaturedVideo;
