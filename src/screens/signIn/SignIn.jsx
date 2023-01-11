import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './signIn.css';
import logo from '../../assets/Tottologo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import DropdownList from "react-widgets/DropdownList";
import { Container, InputGroup, FormControl, Button, Dropdown } from 'react-bootstrap';


const PHONE_NUMBER_REGEX = /^\d{6,14}$/g;

const COUNTRY_CODES = [
    { country: "India", code: "+91" },
    { country: "Bahrain", code: "+973" },
    { country: "Oman", code: "+968" },
    { country: "Qatar", code: "+974" },
    { country: "Saudi Arabia", code: "+966" },
    { country: "United Arab Emirates", code: "+971" },
    { country: "United Kingdom", code: "+44" },
    { country: "United States", code: "+1" },
]


function SignIn() {
    const [countrycode, setCountry] = useState('+91');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(null)
    const [isOtpSend, setIsOtpSent] = useState(false)
    const [successMessage, setSuccessMessage] = useState(null)
    const [otp, setOtp] = useState('')

    const submitPhoneNumber = () => {
        if (phoneNumber.length < 6) return setError('Enter a valid mobile number');
        if (!phoneNumber.match(PHONE_NUMBER_REGEX)) return setError('Enter a valid mobile number including digits only');
        setError(null);
        setIsOtpSent(true);
        // setActivityInProgress(true);
    }
    const submitOtp = ()=>{
        setSuccessMessage(null);
        if(otp.length < 6) return setError('Enter 6 digit OTP');
        if(!otp.match(/^\d{6}$/g)) return setError('OTP contains characters other than digits');
        setError(null);
        // setActivityInProgress(true);
    }

    return (
        <div className="Login">
            <div className="totto-logo">
                <img src={logo} alt='logo' />
            </div>
            <div className="ComponentA">
                <div className="Container" >
                    {isOtpSend === false ?
                        <> <div className="Login-Container-Text17">
                            <p>Enter Your Mobile Number</p>
                            <p>to signIn</p>
                        </div>
                            <div className="custom-textfield">
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-custom-components" className="toogle-1" variant="">
                                        {countrycode}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            COUNTRY_CODES.map((item) =>
                                                <Dropdown.Item className="dropdown-item" eventKey={item.code} onClick={() => setCountry(item.code)} active={countrycode === item.code}>
                                                    {`${item.country} (${item.code})`}
                                                    {console.log(item.code)}
                                                </Dropdown.Item>
                                            )
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                                <input
                                    className="input1"
                                    type="text"
                                    id="lname"
                                    name="lname"
                                    placeholder="Phone number"
                                    value={phoneNumber}
                                    maxLength={11}
                                    onInput={(e) => {
                                        setPhoneNumber(e?.target.value?.replace(/[^\d]/g, '') ?? '')
                                    }}
                                ></input>
                            </div>
                            <p className="error-text">{error}</p>
                            <div className="container-button" >
                                <button className="button" onClick={submitPhoneNumber}>Get OTP</button>
                            </div></>
                        :
                        <><p className="number-2" >Enter the 6 Digit OTP sent to</p> <div className="Login-Container-Text179">
                            
                            <p className="number">{`${countrycode}  ${phoneNumber}`}</p>
                        </div>
                            <div className="custom-textfield">
                                <input
                                    type="text"
                                    id="lname"
                                    name="lname"
                                    placeholder="6 Digit OTP"
                                    value={otp}
                                    maxLength={6}
                                    inputMode="numeric"
                                    onInput={(e) => {
                                        setOtp(e?.target.value?.replace(/[^\d]/g, '') ?? '')
                                    }}
                                    style={{ textAlign: 'center' }}
                                ></input>
                            </div>
                            <p className="error-text">{error}</p>
                            <div className="container-button" >
                                <button className="button" onClick={submitOtp}>Verify OTP</button>
                            </div></>
                    }
                </div>
            </div>
        </div>
    );
}

export default SignIn;