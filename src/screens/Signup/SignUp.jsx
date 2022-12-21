import React , {useState}from "react";
import './signup.css';
import logo from '../../assets/Tottologo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircleCheck, faEnvelope, faKey, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link ,useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword ,sendEmailVerification ,getAuth} from "firebase/auth";

import { auth ,db} from "../../firebase";


import { collection, setDoc, doc,query, where, getDocs } from "firebase/firestore"; 

function SignUp() {

  const navigate= useNavigate();

  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");
  const [linkName,setLinkName] =useState("");
  const [user,setUser] = useState(null); 

  let sentUsernsme = async(user) => {
    try {
      const docRef = doc(db, 'users', user.uid);
      setDoc(docRef, {
        linkName: linkName,
        email: email,
        uid: user.uid
      }, {merge: true});
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  const signUpfunction = async ()=>{
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('name', '==', linkName));
    const querySnapshot = await getDocs(q);
    
    // console.log(querySnapshot.size);
    if(querySnapshot.size>0){
      console.log('Link Name exist');
    }else{
      console.log('Link Name doesnot exist');

    }
    // return;

    createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
      // const auth = getAuth();
              sendEmailVerification(auth.currentUser)
                .then(() => {

                });

      const user = userCredential.user;
      setUser(user); 
      sentUsernsme(user);
      navigate("/signup/stepper");

    }).catch((error)=>{
      const errorMessage = error.message;
      console.log(errorMessage);
    })

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
          <p >tottoLearing.com/experts/</p>
        </div>
{/* // todo username */}
        <div className="custom-textfield">
          <FontAwesomeIcon className="icon1" icon={faUser} />
          <input type="text" id="lname" name="lname" placeholder="Username" onChange={(e) =>setLinkName(e.target.value)}></input>
          <FontAwesomeIcon className="icon28" icon={faCircleCheck} />
        </div>
 {/* // todo email */}
        <div className="custom-textfield">
          <FontAwesomeIcon className="icon1" icon={faEnvelope} />
          <input type="text" id="lname" name="lname" placeholder="Email" onChange={(e) =>setEmail(e.target.value)}></input>
        </div>
{/* // todo password */}
        <div className="custom-textfield">
          <FontAwesomeIcon className="icon1" icon={faKey} />
          <input type="text" id="lname" name="lname" placeholder="Password" onChange={(e) =>setPassword(e.target.value)}></input>
          <FontAwesomeIcon className="icon28" icon={faEyeSlash} />
        </div>
{/* //! password  repeate*/}
        <div className="custom-textfield">
          <FontAwesomeIcon className="icon1" icon={faKey} />
          <input type="text" id="lname" name="lname" placeholder="Confrim password"></input>
          <FontAwesomeIcon className="icon28" icon={faEye} />
        </div>
 {/* //!  button    */}
        {/* <Link to='/signup/stepper'>
          <div className="container-button">
            <button className="button" onClick={signUpfunction}>SignUp</button>
          </div></Link> */}
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