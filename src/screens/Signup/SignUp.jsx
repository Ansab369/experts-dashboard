import React from "react";
import './signup.css';
import logo from '../../assets/Tottologo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser , faCircleCheck ,faEnvelope ,faKey ,faEyeSlash ,faEye} from '@fortawesome/free-solid-svg-icons';
import { Link  } from 'react-router-dom';



function SignUp() {
  return (
    <div className="Login">
        <div className="totto-logo">
          <img src={logo} alt='logo'/>
        </div>


        <div className="SignUpContainer" >
          <div className="Login-Container-Text1">
          <p>SignUp to Start</p>
          </div>
          <div className="Login-Container-Text2">
            <p >tottoLearing.com/experts/</p>
          </div>
          {/* //! username */}
            <div className="custom-textfield">
                <FontAwesomeIcon className="icon1" icon= {faUser} />
                <input type="text" id="lname" name="lname" placeholder="Username"></input>
                <FontAwesomeIcon className="icon2" icon= {faCircleCheck} />
            </div>
          {/* //! email */}
            <div className="custom-textfield">
                <FontAwesomeIcon className="icon1" icon= {faEnvelope} />
                <input type="text" id="lname" name="lname" placeholder="Email"></input>
            </div>
          {/* //! password */}
            <div className="custom-textfield">
                <FontAwesomeIcon className="icon1" icon= {faKey} />
                <input type="text" id="lname" name="lname" placeholder="Password"></input>
                <FontAwesomeIcon className="icon2" icon= {faEyeSlash} />

            </div>
             {/* //! password  repeate*/}
             <div className="custom-textfield">
                <FontAwesomeIcon className="icon1" icon= {faKey} />
                <input type="text" id="lname" name="lname" placeholder="Confrim password"></input>
                <FontAwesomeIcon className="icon2" icon= {faEye} />

            </div>
            {/* //!  button    */}     
           <Link to='/signup/stepper'>  
           <div className="container-button">
            <button className="button">SignUp</button>
            </div></Link>
            <div className="login-text">
              <div className="login-session">
              <p>Alredy a member?<Link to='/login'> LogIn</Link></p>
                   
              </div>

            </div>
        </div>
    </div>
  );
}

export default SignUp;