import React, { useState ,useEffect} from "react";
import HashLoader from "react-spinners/HashLoader";

import SignUp from './screens/Signup/SignUp';
import Login from './screens/Login/Login';
import Stepper from './screens/Stepper/Stepper';
import Dashboard from './screens/Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth} from "./firebase";

import Revenue from "./screens/Dashboard/revenue/Revenue";
import BasicInfo from './screens/Dashboard/editBio/components/BasicInfo';
import SocialLinks from './screens/Dashboard/editBio/components/SocialLink';
import FeaturedSession from './screens/Dashboard/editBio/components/FeaturedSession';
import FeaturedVideo from './screens/Dashboard/editBio/components/FeaturedVideo';


//!  experts
import Experts from './screens/expertsPublic/Experts'


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/"
            element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Revenue /></PrivateRoute>} />
          <Route path="/editbio/basicinfo" element={<PrivateRoute><BasicInfo /></PrivateRoute>} />
          <Route path="/editbio/links" element={<PrivateRoute><SocialLinks /></PrivateRoute>} />
          <Route path="/editbio/session" element={<PrivateRoute><FeaturedSession /></PrivateRoute>} />
          <Route path="/editbio/video" element={<PrivateRoute><FeaturedVideo /></PrivateRoute>} />
          <Route path="/signup/stepper" element={<PrivateRoute><Stepper /></PrivateRoute>} />
          <Route path="/signup" element={<PrivateRoute><SignUp /></PrivateRoute>} />
          <Route path="/experts" element={<PrivateRoute><Experts /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

const PrivateRoute = ({children}) => {

  const [status, setStatus] = useState()

  useEffect(() => {
    const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setStatus('signedIn');
      } else {
        setStatus('signedOut');
      }
    });
  }, []);


  if (status === 'signedOut') return <Login />;
  if (status === 'signedIn') return <>
    {children}
  </>

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
      <HashLoader color="#36d7b7" />
    </div>
  );
};

export default App;
