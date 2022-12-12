import React from "react";
// import '../Signup/signup.css'
import './login.css';
import logo from '../../assets/Tottologo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link  } from 'react-router-dom';


function Login() {
    return (
        <div className="Login">
            <div className="totto-logo">
                <img src={logo} alt='logo' />
            </div>


            <div className="LoginContainer" >
                <div className="Login-Container-Text1">
                    <p>Login Here!</p>
                </div>

                {/* //! email */}
                <div className="custom-textfield">
                    <FontAwesomeIcon className="icon1" icon={faEnvelope} />
                    <input type="text" id="lname" name="lname" placeholder="Email"></input>
                </div>
                {/* //! password */}
                <div className="custom-textfield">
                    <FontAwesomeIcon className="icon1" icon={faKey} />
                    <input type="text" id="lname" name="lname" placeholder="Password"></input>
                    <FontAwesomeIcon className="icon2" icon={faEyeSlash} />

                </div>
               
                {/* //!  button */}
                <Link to='/'> 
                 <div className="container-login-button">
                     <button className="button">Login</button>
                 </div>
                </Link>
                <div className="forgot-pass"><a href="#demo">Forgot Password?</a></div>

                <div className="login-text">
                    <div className="login-session">
                        <p>You don’t have an account?<Link to='/signup'> SignUp</Link></p>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Login;
