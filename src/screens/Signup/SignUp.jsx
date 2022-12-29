import React, { useState } from "react";
import './signup.css';
import logo from '../../assets/Tottologo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircleCheck, faEnvelope, faKey, faEyeSlash, faEye, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from "firebase/auth";
import { auth, db } from "../../firebase";


import { collection, setDoc, doc, query, where, getDocs } from "firebase/firestore";

function SignUp() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [linkName, setLinkName] = useState("");
  const [user, setUser] = useState(null);
  const [signUpError, setSignUpError] = useState("");

  const [show_input1, setshow_input1] = useState(false);
  const [show_input2, setshow_input2] = useState(false);
  const [eyeIcon1, setEyeIcon1] = useState(faEye);
  const [eyeIcon2, setEyeIcon2] = useState(faEye);

  const [usernameIcon, setUsernameIcon] = useState(false);



  let sentUsernsme = async (user) => {
    try {
      const docRef = doc(db, 'users', user.uid);
      setDoc(docRef, {
        linkName: linkName,
        email: email,
        uid: user.uid
      }, { merge: true });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  const signUpfunction = async () => {
    const regex = /[^a-zA-Z]/g;
    if (!regex.test(linkName)) {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('linkName', '==', linkName));
      // console.log('q is =========',q);
      const querySnapshot = await getDocs(q);
      // console.log('querySnapshot is =========',querySnapshot);
      if(linkName===''){
         setSignUpError('Enter Username');
      }else{
      if (querySnapshot.size > 0) {
        setSignUpError('This username is already in use.');
        setUsernameIcon(false);
      } else {
        setUsernameIcon(true);
        conformPassword === password ?
          createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            sendEmailVerification(auth.currentUser)
              .then(() => {
              });
            const user = userCredential.user;
            setUser(user);
            sentUsernsme(user);
            navigate("/signup/stepper");
          }).catch((error) => {
            const errorCode = error.code;
            console.log(error.message);
            console.log(errorCode);
            if (errorCode == 'auth/internal-error') {
              setSignUpError('Enter email and password !');
            } else if (errorCode == 'auth/invalid-email') {
              setSignUpError('Enter a valid Email !');
            } else if(errorCode == 'auth/weak-password') {
              setSignUpError('Password has to be min. 8 chars.');
            }else if (errorCode == 'auth/email-already-in-use') {
              setSignUpError('Email alredy in use.');
            }
          }) : setSignUpError('Password not matching.');
      }}
    } else {
      setSignUpError('Username must be letters');
      setUsernameIcon(false);
    }
  }
  const PasswordHide1 = () => {
    if (eyeIcon1 === faEyeSlash) {
      setEyeIcon1(faEye);
      setshow_input1(false);

    } else {
      setEyeIcon1(faEyeSlash);
      setshow_input1(true);
    }
  }
  const PasswordHide2 = () => {
    if (eyeIcon2 === faEyeSlash) {
      setEyeIcon2(faEye);
      setshow_input2(false);

    } else {
      setEyeIcon2(faEyeSlash);
      setshow_input2(true);
    }
  }

  return (
    <div className="Login">
      <div className="totto-logo">
        <img src={logo} alt='logo' />
      </div>
      <div className="SignUpContainer" >
        <div className="Login-Container-Text1">
          <p>SignUp to Start</p>
        </div>
        <div className="Login-Container-Text2">
          <p >tottolearning.com/experts/</p>
        </div>
        {/* // todo username */}
        <div className="custom-textfield">
          <FontAwesomeIcon className="icon1" icon={faUser} />
          <input type="text" id="lname" name="lname" placeholder="Username" onChange={(e) => setLinkName(e.target.value)}></input>
          <FontAwesomeIcon className={usernameIcon === false ? "icon28 icon38 icon73" : "icon28 icon38"} icon={usernameIcon === false ? faCircleXmark : faCircleCheck} />
        </div>
        {/* // todo email */}
        <div className="custom-textfield">
          <FontAwesomeIcon className="icon1" icon={faEnvelope} />
          <input type="text" id="lname" name="lname" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        {/* // todo password */}
        <div className="custom-textfield">
          <FontAwesomeIcon className="icon1" icon={faKey} />
          <input type={show_input1 ? 'text' : 'password'} id="lname" name="lname" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
          <FontAwesomeIcon className="icon28" onClick={PasswordHide1} icon={eyeIcon1} />
        </div>
        {/* //! password  repeate onClick={PasswordHide2} */}
        <div className="custom-textfield">
          <FontAwesomeIcon className="icon1" icon={faKey} />
          <input
            type={show_input2 ? 'text' : 'password'}
            id="lpassword" name="lname" placeholder="Confrim password" onChange={(e) => setConformPassword(e.target.value)}></input>
          <FontAwesomeIcon className="icon28" onClick={PasswordHide2} icon={eyeIcon2} />
        </div>
        <div className="SignScreen-errorText">
          <p>{signUpError}</p>
        </div>
        {/* // todo  button    */}
        <div className="container-button" onClick={signUpfunction}>
          <button className="button">SignUp</button>
        </div>
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