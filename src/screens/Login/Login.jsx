import React, { useState } from "react";
// import '../Signup/signup.css'
import './login.css';
import logo from '../../assets/Tottologo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";


function Login() {

    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState(null);
    const [eyeIcon, setEyeIcon] = useState(faEye);
    const [show_input, setshow_input] = useState(false);


    const Loginfunction = () => {
        if (loginEmail ?? '') {
            signInWithEmailAndPassword(auth, loginEmail, loginPassword).then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                navigate("/");
            }).catch((error) => {
                const loginError = error.code;
                console.log('Failed with error code: ', { loginError });
                // const errorMessage = error.message;
                if (loginError == 'auth/invalid-email') {
                    setLoginError('Invalid Email!');
                } else if (loginError == 'auth/internal-error') {
                    setLoginError('Incorrect Password!');
                } else if (loginError == 'auth/wrong-password') {
                    setLoginError('Incorrect Password!');
                } else if (loginError == 'auth/too-many-requests') {
                    setLoginError('Too many attempts try later!');
                }  else if (loginError == 'auth/user-not-found') {
                    setLoginError('Email and password is incorrect.!');
                } 
                else {
                    setLoginError('');
                }
            })
        } else { setLoginError('Invalid Email!'); }
    }
    const PasswordHide = () => {
        if (eyeIcon === faEyeSlash) {
            setEyeIcon(faEye);
            setshow_input(false);

        } else {
            setEyeIcon(faEyeSlash);
            setshow_input(true);
        }
    }

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
                    <input type="text" id="lname" name="lname" placeholder="Email" onChange={(e) => setLoginEmail(e.target.value)}></input>
                </div>
                {/* //! password */}
                <div className="custom-textfield">
                    <FontAwesomeIcon className="icon1" icon={faKey} />
                    <input
                        type={show_input ? 'text' : 'password'}
                        id="lpassword"
                        name="lpassword"
                        placeholder="Password"
                        onChange={(e) => setLoginPassword(e.target.value)}></input>
                    <FontAwesomeIcon className="icon28" onClick={PasswordHide} icon={eyeIcon} />
                </div>
                <div className="LoginScreen-errorText">
                    <p>{loginError}</p>
                </div>
                {/* //!  button */}
                <div className="container-login-button">
                    <button className="button" onClick={Loginfunction}>Login</button>
                </div>
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
