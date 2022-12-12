import React from "react";
import './dashboard.css';
// import logo from '../../assets/Tottologo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route,} from 'react-router-dom';

import Profile from './profile/Profile';
// import EditBio from './editBio/EditBio';
import Revenue from "./revenue/Revenue";
// import LogOut from './LogOut/LogOut';

import BasicInfo from "./editBio/components/BasicInfo";
import SocialLinks from "./editBio/components/SocialLink";
import FeaturedSession from "./editBio/components/FeaturedSession";
import FeaturedVideo from "./editBio/components/FeaturedVideo";

// import Login from '../Login/Login' ;
import DashBoardNavBoard from './DashBoardNavBar';




function Dashboard() {
  // const location = useLocation();
  // const [toggleMenu, setToggleMenu] = useState(false);
  // const [modal, setModal] = useState(false);

  // const toggleModal = () => {
  //   setModal(!modal);
  // };
  // if(modal) {
  //   document.body.classList.add('active-modal')
  // } else {
  //   document.body.classList.remove('active-modal')
  // }
  return (
    <div>
      <DashBoardNavBoard/>
      {/* <div className="totto__navbar">
        <div className="totto__navbar-links">
          <div className="totto__navbar-links-logo">
            <img src={logo} alt='logo' />
          </div>
        </div>
        <CustomLink to='/' className={location.pathname==='/'? 'totto__navbar-links-container':'totto__navbar-links-container2'}>Profile</CustomLink>
        <CustomLink to='/dashboard' className={location.pathname==='/dashboard'? 'totto__navbar-links-container':'totto__navbar-links-container2'}>Dashboard</CustomLink>
        <CustomLink to='/editbio/basicinfo' className={location.pathname===('/editbio/basicinfo'||'/editbio/links'|| '/editbio/session' || '/editbio/video') ? 'totto__navbar-links-container':'totto__navbar-links-container2'}>Edit bio</CustomLink>
        <button className="logOut-navBar"  onClick={toggleModal}>LogOut</button>
              {modal && (
              <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                  <h2>Log Out!</h2>
                  <p className="modal-content-p">Are you sure want to log out?</p>
                  <div className="popup-buttons">
                    <div className="Cancel-button" onClick={toggleModal}><p>Cancel</p></div>
                    <div className="logOut-button"><p>Log Out</p></div>
                  </div>
                  <FontAwesomeIcon className="close-modal" icon={faXmark} onClick={toggleModal}/>
                </div>
              </div>
            )}
        <div className='totto__navbar-menu'>
          {
            toggleMenu
              ? <FontAwesomeIcon className="icon2" icon={faXmark} onClick={() => setToggleMenu(false)} />
              : <FontAwesomeIcon className="icon2" icon={faBars} onClick={() => setToggleMenu(true)} />
          }
          {
            toggleMenu && (
              <div className='totto__navbar-menu_container scale-up-center'>
                <div className='totto__navbar-menu_container-links' >
                  <p><Link to='/' >Profile</Link></p>
                  <p><Link to='/dashboard' >Dashboard</Link></p>
                  <p><Link to='/editbio/basicinfo' >Edit bio</Link></p>
                </div>
              </div>
            )
          }
        </div>
      </div> */}
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

// function CustomLink({ to, children, className, ...props }) {
//   return <div className={className}>
//     <p>  <Link to={to} >{children}</Link>  </p>
//   </div>
// }

export default Dashboard;
