import React ,{useState} from "react";
// import './editBio.css';
import { Link, useLocation} from 'react-router-dom';
import logo from '../../assets/Tottologo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { getAuth, signOut } from "firebase/auth";

function DashBoardNavBoard() {
  const location = useLocation();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleModalmenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const toggleModal = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

    setModal(!modal);
  };
  
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  if(toggleMenu) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  // String [editBioClassName, seteditBioClassName] = useState("");
  // if(location.pathname==='/editbio/basicinfo'){
  //   seteditBioClassName = 'totto__navbar-links-container';
  // }else if(location.pathname==='/editbio/links'){
  //    seteditBioClassName = 'totto__navbar-links-container';
  // }else if(location.pathname==='/editbio/session'){
  //    seteditBioClassName = 'totto__navbar-links-container';
  // }else if(location.pathname==='/editbio/video'){
  //    seteditBioClassName = 'totto__navbar-links-container';
  // }else{ seteditBioClassName = 'totto__navbar-links-container2';}
  
  // const pathList = ['/editbio/basicinfo','/editbio/links' , '/editbio/session' , '/editbio/video'];
  // for (let x of pathList) {
  //   setPath += x ;
  // }


  return (
    <div className="totto__navbar">
    <div className="totto__navbar-links">
      <div className="totto__navbar-links-logo">
        <img src={logo} alt='logo' />
      </div>
    </div>
    <CustomLink to='/' className={location.pathname==='/'? 'totto__navbar-links-container':'totto__navbar-links-container2'}>Profile</CustomLink>
    <CustomLink to='/dashboard' className={location.pathname==='/dashboard'? 'totto__navbar-links-container':'totto__navbar-links-container2'}>Dashboard</CustomLink>
    {/* <CustomLink to='/editbio/basicinfo' className={location.pathname===('/editbio/basicinfo'||'/editbio/links'|| '/editbio/session' || '/editbio/video') ? 'totto__navbar-links-container':'totto__navbar-links-container2'}>Edit bio</CustomLink> */}
    <CustomLink to='/editbio/basicinfo' className={location.pathname==='/editbio/basicinfo'?'totto__navbar-links-container': location.pathname=== '/editbio/links'? 'totto__navbar-links-container':   location.pathname=== '/editbio/session'?  'totto__navbar-links-container':     location.pathname=== '/editbio/video'?  'totto__navbar-links-container': 'totto__navbar-links-container2'}>Edit bio</CustomLink>
    
    
    <button className="logOut-navBar"  onClick={toggleModal}>LogOut</button>
          {modal && (
          <LogOutPopUp toggleModal={toggleModal}/>
        )}
    <div className='totto__navbar-menu'>
      {
        toggleMenu
          ? <FontAwesomeIcon className="icon2" icon={faXmark} onClick={() => toggleModalmenu(false)} />
          : <FontAwesomeIcon className="icon2" icon={faBars} onClick={() => toggleModalmenu(true)} />
      }
      {
        toggleMenu && (
          <div className='totto__navbar-menu_container scale-up-center'>
            <div className='totto__navbar-menu_container-links' >
              <p><Link to='/' >Profile</Link></p>
              <p><Link to='/dashboard' >Dashboard</Link></p>
              <p><Link to='/editbio/basicinfo' >Edit bio</Link></p>
             
              <button className="logOut-navBar-menu"  onClick={toggleModal}>LogOut</button>
            </div>
          </div>
        )
      }
    </div>
  </div>
  );
}
function CustomLink({ to, children, className, ...props }) {
    return <div className={className}>
      <p>  <Link to={to} >{children}</Link>  </p>
    </div>
  }
function LogOutPopUp({toggleModal, ...props }) {
    return   <div className="modal">
    <div onClick={toggleModal} className="overlay"></div>
    <div className="modal-content">
      <h2>Log Out!</h2>
      <p className="modal-content-p">Are you sure want to log out?</p>
      <div className="popup-buttons">
        <div className="Cancel-button" onClick={toggleModal}><p>Cancel</p></div>
        <div className="logOut-button"><Link to='/login' className="link-text"><p>Log Out</p></Link></div>
      </div>
      <FontAwesomeIcon className="close-modal" icon={faXmark} onClick={toggleModal}/>
    </div>
  </div>
  }
export default DashBoardNavBoard;
