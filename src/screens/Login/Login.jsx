import React ,{useState} from "react";
// import '../Signup/signup.css'
import './login.css';
import logo from '../../assets/Tottologo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link ,useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";


function Login() {

  const navigate= useNavigate();


    const Loginfunction =()=>{
        signInWithEmailAndPassword(auth, loginEmail, loginPassword) .then((userCredential) => {
            const user = userCredential.user;
            setUser(user);
            navigate("/");
            // console.log(user);
        }).catch((error)=>{
            // const error = err.message;
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
          })
    }


    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user,setUser] = useState(null); 


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
                    <input type="text" id="lname" name="lname" placeholder="Email" onChange={(e) =>setLoginEmail(e.target.value)}></input>
                </div>
                {/* //! password */}
                <div className="custom-textfield">
                    <FontAwesomeIcon className="icon1" icon={faKey} />
                    <input type="text" id="lname" name="lname" placeholder="Password" onChange={(e) =>setLoginPassword(e.target.value)}></input>
                    <FontAwesomeIcon className="icon28" icon={faEyeSlash} />

                </div>

                {/* //!  button */}
                {/* <Link to='/'> */}
                    <div className="container-login-button">
                        <button className="button" onClick={Loginfunction}>Login</button>
                    </div>
                {/* </Link> */}
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
