import React, { useState, useEffect } from "react";
import './componentA.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { db, auth } from "../../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import HashLoader from "react-spinners/HashLoader";

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



function ComponentA({ currentStep, onBackIconClicked, nextButtonClicked }) {
  const steps = ["Bio", "Social", "Session", "Video"];


  const [firstName, setFirstName] = useState(null);
  const [LastName, setLastName] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [userlocation, setLocation] = useState(null);
  const [userOrganization, setOrganization] = useState(null);
  const [userAbout, setAboutUser] = useState(null);
  const [userEducation, setUserEducation] = useState(null);
  const [userExpertIn, setUserExpertIn] = useState([]);
  const [userSkills, setUserSkills] = useState([]);

  //! errors
  const [firstNameError, setFirstNameError] = useState('');
  const [profileError, setProfileError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [secondNmeError, setSecondNameError] = useState('');
  const [organizationError, setOrganizationError] = useState('');
  const [aboutError, setAboutError] = useState('');
  const [educationError, setEducationError] = useState('');
  const [expertsInError, setExpertsInError] = useState('');
  const [skillsError, setSkillsError] = useState('');

  const [loading, setLoading] = useState(false);


  //! fetch data
  useEffect(() => {
    const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        fetchUserData(uid);
      } else {
      }
    });
  }, []);

  let fetchUserData = async (uid) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    const datas = docSnap.data();
    if (docSnap.exists()) {
      setProfileImage(datas.userImageUrl);
      setFirstName(datas.firstName);
      setLastName(datas.lastName);
      setLocation(datas.location);
      setOrganization(datas.organization);
      setAboutUser(datas.about);
      setUserEducation(datas.education);
      setUserExpertIn(datas.expertsIn);
      setUserSkills(datas.skills);
    } else {
      // console.log("No such document!");
    }
  }

  // !  use update methord..
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
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: =======", e);
    }
  }

  function Validation() {
    let flag=true;

    if (firstName === null || firstName === undefined || firstName === '') {
      setFirstNameError('Enter First Name');
      flag=false;
    } else if (firstName.length >= 20) {
      setFirstNameError('maximum 20 charactors');
      flag=false;
    } else {
      setFirstNameError('');
    }


    if (LastName === null || LastName === undefined || LastName === '') {
      setSecondNameError('Enter Last Name');
      flag=false;
    }  else if (LastName.length>= 20) {
      setSecondNameError('maximum 20 charactors');
      flag=false;
    } else {
      setSecondNameError('');
    }

    if (profileImage === null || profileImage ===undefined) {
      setProfileError('Upload profile pic');
      flag=false;
    } else {
      setProfileError('');
    }

    if (userlocation === null || userlocation === undefined || userlocation === '') {
      setLocationError('Enter your location');
      flag=false;
    } else {
      setLocationError('');
    }

    if (userOrganization === null || userOrganization === undefined ||  userOrganization === '') {
      setOrganizationError('Enter your Organization');
      flag=false;
    }  else {
      setOrganizationError('');
    }

    if (userAbout === null || userAbout===undefined|| userAbout==='') {
      setAboutError('Enter about you.');
      flag=false;
    } else {
      setAboutError('');
    }

    if (userEducation === null || userEducation === undefined || userEducation === '') {
      setEducationError('Enter your education details.');
      flag=false;
    } else {
      setEducationError('');
    }

    if (userExpertIn === undefined|| userExpertIn.length === 0 ) {
      setExpertsInError('Enter your proffesion Tags.');
      flag=false;
    } else {
      setExpertsInError('');
    }

    if ( userSkills === undefined || userSkills.length === 0 ) {
      setSkillsError('Enter your Skills');
      flag=false;
    } else {
      setSkillsError('');
    }

    return flag;
  }

  async function sentDataToFireBase() {

    console.log(profileImage);

    const validationSuccess= Validation();
    if(validationSuccess!==true){
      return false;
    }
    // console.log('newSelectedImage~~~~~',newSelectedImage)
    // Validation();
    // if (firstName !== '' && LastName !== '' && profileImage !== null && userlocation !== '' && userOrganization !== '' && userAbout !== '' && userEducation !== '') {
      console.log('no data')
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;
      if(typeof profileImage!== 'string'){
      const storage = getStorage();
      const storageRef = ref(storage, `userProfile/${user.uid}/${profileImage.name}`);
      let snapshot = await uploadBytes(storageRef, profileImage);
      let url = await getDownloadURL(snapshot.ref);
      sentUsernsme(user, url);
      nextButtonClicked();
    }else{
     let url = profileImage;
     sentUsernsme(user, url);
      nextButtonClicked();
    }
    // }
    return;
  }

  const [newSelectedImage, setNewSelectedImage] = useState(null);
  const uploadFile = (e) => {
    let file = e.target.files[0];
    console.log('file name 1  : ', file.name);
    setNewSelectedImage(URL.createObjectURL(file));
    if (file) {
      setProfileImage(file);
    }
  }

  const selectedTags = tags => {
    console.log(tags);
  };


  return (
    <div>
      {
        loading === true ?
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            width: "100%",
          }}>
            <HashLoader color="#8B77EE" />
          </div> : ''
      }

      <div className="ComponentA">
        <div className="infotext11">
          <FontAwesomeIcon className="icon7" icon={faCircleInfo} />
          <p>fill in your details for getting your </p>
          
        </div><p className="infotext-876">own personalized Web Page</p>
        <div className="Container container-padding" >
          {/* //!  name */}
          <div className="textfieldinfo1">
            <p>Name</p>
            <div className="error-Text">
              <p>{firstNameError}</p>
            </div>
          </div>
          <div className="textfield">
            <input type="text" id="lname" name="lname" placeholder="Name"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value) }}
            ></input>
          </div>
          {/* <div className="textfieldinfo1">
            <p>Last Name</p>
            <div className="error-Text">
              <p>{secondNmeError}</p>
            </div>
          </div> */}
          {/* <div className="textfield">
            <input type="text" id="lname" name="lname" placeholder="Last name"
              value={LastName}
              onChange={(e) => { setLastName(e.target.value) }}
            ></input>
          </div> */}
          {/* //! image select */}
          <div className="textfieldinfo1">
            <p>Image</p>
            <div className="error-Text">
              <p>{profileError}</p>
            </div>
          </div>
          <div className="container-button101">
          <div className="textfield">
          {newSelectedImage===null && profileImage===undefined?'':
           <img src={newSelectedImage!==null?newSelectedImage:profileImage} alt='thumbnail' className="profile-image-edit" />}
            <input type="file" name='Selct image' className="button90 img-select-buttons" onChange={uploadFile} />
          </div>
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
          {/* <div className="textfieldinfo1">
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
          </div> */}
          {/* //!  about */}
          {/* <div className="textfieldinfo1">
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
          </div> */}
          {/* //! Education */}
          {/* <div className="textfieldinfo1">
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
          </div> */}
          {/* //! Tag Session 1  -- Expert In   */}
          {/* <div className="textfieldinfo1">
            <p>Expert In</p>
            <div className="error-Text">
              <p>{expertsInError}</p>
            </div>
          </div>
          <TagsInput selectedTags={selectedTags}
            tags={userExpertIn ?? []}
            setTags={tags => setUserExpertIn(tags)}/> */}

          {/* //! Tag Session 2 -- Skills */}
          {/* <div className="textfieldinfo1">
            <p>Skills</p>
            <div className="error-Text">
              <p>{skillsError}</p>
            </div>
          </div>
          <TagsInput selectedTags={selectedTags}
            tags={userSkills ?? []}
            setTags={tags => setUserSkills(tags)}/> */}
        </div>
      </div>


      <div className="maxwidth" >
        <span className="iconbuttton" onClick={onBackIconClicked}>
          <FontAwesomeIcon className={currentStep === 1 ? "icon6" : "icon5"} id="backarrow" icon={faArrowLeft} />
        </span>
        <button
          className="btn1"
          onClick={sentDataToFireBase}>
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default ComponentA;
