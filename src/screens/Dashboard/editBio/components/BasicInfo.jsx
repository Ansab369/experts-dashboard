import React  from "react";
// import './editBio.css';
// import { Link} from 'react-router-dom';
import EditBioNavBar from '../EditBioNavBar';
import ComponentA from '../../../Stepper/Components/Bio/ComponentA';
import DashBoardNavBoard from '../../DashBoardNavBar';

function BasicInfo() {
  return (
    
    <div className="basicInfo">
      <DashBoardNavBoard/>
         <EditBioNavBar/>
         <ComponentA/>
  </div>
  );
}

export default BasicInfo;
