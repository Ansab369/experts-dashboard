import React from "react";


import SignUp from './screens/Signup/SignUp';
import Login from './screens/Login/Login';
import Stepper from './screens/Stepper/Stepper';
import Profile from "./screens/Dashboard/profile/Profile";
import Dashboard from './screens/Dashboard/Dashboard';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';

import Revenue from "./screens/Dashboard/revenue/Revenue";
import BasicInfo from './screens/Dashboard/editBio/components/BasicInfo';
import SocialLinks from './screens/Dashboard/editBio/components/SocialLink';
import FeaturedSession from './screens/Dashboard/editBio/components/FeaturedSession';
import FeaturedVideo from './screens/Dashboard/editBio/components/FeaturedVideo';


function App() {
  return (
    <Router>
    <div className="App">
              <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Revenue />} />
                    <Route path="/editbio/basicinfo" element={<BasicInfo />} />
                      <Route path="/editbio/links" element={<SocialLinks />} />
                      <Route path="/editbio/session" element={<FeaturedSession />} />
                      <Route path="/editbio/video" element={<FeaturedVideo />} />
                    <Route path="/signup/stepper" element={<Stepper/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    
               </Routes >
                {/* <SignUp/> */}
                {/* <Login/> */}
                {/* <Stepper/> */}
                {/* <Dashboard/> */}
    </div></Router>
  );
}

export default App;
