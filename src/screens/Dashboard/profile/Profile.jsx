import React, { useState, useEffect } from "react";
import './profile.css';
import userimage from '../../../assets/userimage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPenToSquare, faCopy } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import { auth, db } from "../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import HashLoader from "react-spinners/HashLoader";


function Profile() {
  const [userProfile, setUserProfile] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [datas, setDatas] = useState();
  const [showBioStepper, setShowBioStepper] = useState(false);
  //! stepper states
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [userlocation, setLocation] = useState('');
  const [userOrganization, setOrganization] = useState('');
  const [userAbout, setAboutUser] = useState('');
  const [userEducation, setUserEducation] = useState('');
  const [userExpertIn, setUserExpertIn] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  //! errors
  const [firstNameError, setFirstNameError] = useState('');
  const [secondNmeError, setSecondNameError] = useState('');
  const [profileError, setProfileError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [organizationError, setOrganizationError] = useState('');
  const [aboutError, setAboutError] = useState('');
  const [educationError, setEducationError] = useState('');
  const [expertsInError, setExpertsInError] = useState('');
  const [skillsError, setSkillsError] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        fetchUserData(uid);
      } else { }
    });
  }, []);

  let sentUsernsme = async (user, profilePicUrl) => {
    try {
      const docRef = doc(db, 'users', user.uid);
      setDoc(docRef, {
        firstName: firstName ?? '',
        lastName: LastName ?? '',
        userImageUrl: profilePicUrl,
        location: userlocation ?? '',
        organization: userOrganization ?? '',
        about: userAbout ?? '',
        education: userEducation ?? '',
        expertsIn: userExpertIn ?? '',
        skills: userSkills ?? '',
      }, { merge: true });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      // console.error("Error adding document: =======", e);
    }
  }

  function Validation() {

    if (firstName === '') {
      setFirstNameError('Enter First Name');
    } else if (firstName.length >= 20) {
      setFirstNameError('maximum 20 charactors');
    } else {
      setFirstNameError('');
    }


    if (LastName === '') {
      setSecondNameError('Enter Last Name');
    } else if (LastName.length >= 20) {
      setSecondNameError('maximum 20 charactors');
    }
    else {
      setSecondNameError('');
    }

    if (profileImage === null) {
      setProfileError('Upload profile pic');
    } else {
      setProfileError('');
    }

    if (userlocation === '') {
      setLocationError('Enter your location');
    } else {
      setLocationError('');
    }

    if (userOrganization === '') {
      setOrganizationError('Enter your Organization');
    } else {
      setOrganizationError('');
    }

    if (userAbout === '') {
      setAboutError('Enter about you.');
    } else {
      setAboutError('');
    }

    if (userEducation === '') {
      setEducationError('Enter your education details.');
    } else {
      setEducationError('');
    }

    if (userExpertIn.length === 0) {
      setExpertsInError('Enter your proffesion Tags.');
    } else {
      setExpertsInError('');
    }

    if (userSkills.length === 0) {
      setSkillsError('Enter your Skills');
    } else {
      setSkillsError('');
    }


  }

  let fetchUserData = async (uid) => {
    // const auth = getAuth();
    // const user = auth.currentUser;
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    if (data.firstName === undefined) {
      console.log("first name is ==", data.firstName);
      setShowBioStepper(true);
    } else {
      if (docSnap.exists()) {
        setDatas(data);
        setUserProfile(data.userImageUrl);
        setIsloading(false);
        // console.log("data is = :", data.firstName);
      } else {
        // console.log("No such document!");
      }

    }

  }

  async function sentDataToFireBase() {
    Validation();
    if (firstName !== '' && LastName !== '' && profileImage !== null && userlocation !== '' && userOrganization !== '' && userAbout !== '' && userEducation !== '') {
      const auth = getAuth();
      const user = auth.currentUser;
      const storage = getStorage();
      const storageRef = ref(storage, `userProfile/${user.uid}/${profileImage.name}`);
      let snapshot = await uploadBytes(storageRef, profileImage);
      let url = await getDownloadURL(snapshot.ref);
      sentUsernsme(user, url);
      window.location.reload();
    }
    return;
  }
  const selectedTags = tags => {
    console.log(tags);
  };

  const uploadFile = (e) => {
    let file = e.target.files[0];
    console.log('file name 1  : ', file.name);
    if (file) {
      setProfileImage(file);
    }
  }

  if (showBioStepper === true) {
    return (
      <>
        <div className="ComponentA">
          <div className="infotext">
            <FontAwesomeIcon className="icon7" icon={faCircleInfo} />
            <p>Add your Details</p>
          </div>
          <div className="Container" >
            {/* //!  name */}
            <div className="textfieldinfo1">
              <p>First Name</p>
              <div className="error-Text">
                <p>{firstNameError}</p>
              </div>
            </div>
            <div className="textfield">
              <input type="text" id="lname" name="lname" placeholder="First name"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value) }}
              ></input>
            </div>
            <div className="textfieldinfo1">
              <p>Last Name</p>
              <div className="error-Text">
                <p>{secondNmeError}</p>
              </div>
            </div>
            <div className="textfield">
              <input type="text" id="lname" name="lname" placeholder="Last name"
                value={LastName}
                onChange={(e) => { setLastName(e.target.value) }}
              ></input>
            </div>
            {/* //! image select */}
            <div className="textfieldinfo1">
              <p>Image</p>
              <div className="error-Text">
                <p>{profileError}</p>
              </div>
            </div>
            <div className="container-button1">
              <input type="file" name='Selct image' className="button90" onChange={uploadFile} />
            </div>
            {/* //! location */}
            <div className="textfieldinfo1">
              <p>Location</p>
              <div className="error-Text">
                <p>{locationError}</p>
              </div>
            </div>
            <div className="textfield">
              <input type="text" id="lname" name="lname" placeholder="Enter Your Location"
                value={userlocation}
                onChange={(e) => { setLocation(e.target.value) }}
              ></input>
            </div>
            {/* //! working at */}
            <div className="textfieldinfo1">
              <p>Working at</p>
              <div className="error-Text">
                <p>{organizationError}</p>
              </div>
            </div>
            <div className="textfield">
              <input type="text" id="lname" name="lname" placeholder="Enter Your Organization"
                value={userOrganization}
                onChange={(e) => { setOrganization(e.target.value) }}
              ></input>
            </div>
            {/* //!  about */}
            <div className="textfieldinfo1">
              <p>About</p>
              <div className="error-Text">
                <p>{aboutError}</p>
              </div>
            </div>
            <div className="textfield">
              <textarea className="textfield-about"
                rows="3"
                cols="45"
                name="description"
                placeholder="About You.."
                value={userAbout}
                onChange={(e) => { setAboutUser(e.target.value) }}>
              </textarea>
            </div>
            {/* //! Education */}
            <div className="textfieldinfo1">
              <p>Education</p>
              <div className="error-Text">
                <p>{educationError}</p>
              </div>
            </div>
            <div className="textfield">
              <input type="text" id="lname" name="lname" placeholder="Your Education Details.."
                value={userEducation}
                onChange={(e) => { setUserEducation(e.target.value) }}
              ></input>
            </div>
            {/* //! Tag Session 1  -- Expert In   */}
            <div className="textfieldinfo1">
              <p>Expert In</p>
              <div className="error-Text">
                <p>{expertsInError}</p>
              </div>
            </div>
            <TagsInput selectedTags={selectedTags}
              tags={userExpertIn ?? []}
              setTags={tags => setUserExpertIn(tags)} />
            {/* //! Tag Session 2 -- Skills */}
            <div className="textfieldinfo1">
              <p>Skills</p>
              <div className="error-Text">
                <p>{skillsError}</p>
              </div>
            </div>
            <TagsInput selectedTags={selectedTags}
              tags={userSkills ?? []}
              setTags={tags => setUserSkills(tags)}
            />
            <div className="save-Button">
              <button className="btn btn-width1" onClick={sentDataToFireBase}>Save</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isLoading === true) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          width: "100%"
        }}>
        <HashLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="header section__padding">
        <div className="header-photo-section">
          <div className="header-image">
            <img src={userProfile} alt='user' />
          </div>
        </div>
        <div className="header-user11">
          <div className="header-user-details-17">
            <h1>{datas.firstName + " " + datas.lastName}</h1>
            <div className="header-user-data">
              <p>{datas.email}</p>
            </div>
            <Link to='/editbio/basicinfo'>  <p className><FontAwesomeIcon className="editIcon" icon={faPenToSquare} />Edit Bio</p></Link>
          </div>
        </div>
      </div>
      <div className="preview-web">
        <div className="preview-1">
          <div className="preview-2">
            <p className="preview-p1">tottolearning.com/experts/{datas.linkName}<FontAwesomeIcon className="copyIcon" icon={faCopy} onClick={() =>  navigator.clipboard.writeText(`tottolearning.com/experts/${datas.linkName}`)} /></p>
            <div className="copy-preview">
              <Link to={`/experts/${datas.linkName}`}><button className="btn">
                Preview
              </button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TagsInput = ({ tags, setTags }) => {
  const removeTags = indexToRemove => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = event => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value])
      event.target.value = "";
    }
  };
  return (
    <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className='tag-title'>{tag}</span>
            <span className='tag-close-icon' onClick={() => removeTags(index)}>x</span>
          </li>
        ))}
      </ul>
      <input type="text" onKeyUp={event => event.key === "," ? addTags(event) : null}
        placeholder="Press , to add tags" />
    </div>
  );
};

export default Profile;  