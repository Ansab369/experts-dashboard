import React ,{useState}  from "react";
import './navbar.css';
import logo from '../../../../assets/expertsAssets/Tottologo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark} from '@fortawesome/free-solid-svg-icons';

const Menu = () =>(
  <>
   <p><a href='#CUDDLE' >CUDDLE</a></p>
   <p><a href='#NURTURE' >NURTURE</a></p>
   <p><a href='#MENTOR' >MENTOR</a></p>
 </>
 )

function Navbar() {
  const [toggleMenu ,setToggleMenu] =useState(false);
  return (
    <div className="totto__navbar1">


      <div className="totto__navbar-links1">
        <div className="totto__navbar-links-logo">
          <img src={logo} alt='logo'/>
        </div>
      </div>


        <div className="totto__navbar-links-container-1">
             <Menu/> 
        </div>
      
      <div className='totto__navbar-menu'>
        {
        toggleMenu
         ? <FontAwesomeIcon className="icon1" color='#000' size= {27} icon={faXmark}  onClick={() => setToggleMenu(false) } />
         : <FontAwesomeIcon className="icon1" color='#000' size= {27} icon={faBars}  onClick={() => setToggleMenu(true) } />
        }
        {
          toggleMenu  &&(
            <div className='totto__navbar-menu_container-1 scale-up-center'>
              <div className='totto__navbar-menu_container-links-1' >
               <Menu/>
              </div>
            </div>
          )
        }
      </div>


    </div>
  );
}

export default Navbar;


/// https://tottolearning.com/wp-content/uploads/2021/05/Group-10-1.png