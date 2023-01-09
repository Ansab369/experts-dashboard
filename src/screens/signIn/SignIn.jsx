import React, { useState } from "react";
import './signIn.css';
import logo from '../../assets/Tottologo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
    return (
        <div className="Login">
            <div className="totto-logo">
                <img src={logo} alt='logo' />
            </div>
            <div className="ComponentA">
                <div className="Container" >
                    <div className="Login-Container-Text17">
                        <p>Enter Your Mobile Number</p>
                        <p>to signIn</p>
                    </div>
                    <div className="custom-textfield">
                        <FontAwesomeIcon className="icon1 icon345" icon={faCaretDown} />
                        <p className="contry-code">+91</p>
                        <input type="text" id="lname" name="lname" placeholder="Phone number"></input>
                    </div>
                    <div className="container-button" >
                        <button className="button">SignIn</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;