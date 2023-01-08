import React from "react";
import './dashboard.css';
import { Routes, Route,} from 'react-router-dom';

import Profile from './profile/Profile';
import Revenue from "./revenue/Revenue";

import BasicInfo from "./editBio/components/BasicInfo";
import SocialLinks from "./editBio/components/SocialLink";
import FeaturedSession from "./editBio/components/FeaturedSession";
import FeaturedVideo from "./editBio/components/FeaturedVideo";

import DashBoardNavBoard from './DashBoardNavBar';




function Dashboard() {

  return (
    <div className="bg-gradient">
      <DashBoardNavBoard/>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/dashboard" element={<Revenue />} />
        {/* <Route path="/editbio" element={<EditBio />} /> */}
        <Route path="/editbio/basicinfo" element={<BasicInfo />} />
        <Route path="/editbio/links" element={<SocialLinks />} />
        <Route path="/editbio/session" element={<FeaturedSession />} />
        <Route path="/editbio/video" element={<FeaturedVideo />} />
      </Routes >
      </div>
  );
}


export default Dashboard;
