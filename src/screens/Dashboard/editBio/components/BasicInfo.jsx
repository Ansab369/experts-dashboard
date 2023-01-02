import React, { useState, useEffect } from "react";
import './basic.css';
import EditBioNavBar from '../EditBioNavBar';
import DashBoardNavBoard from '../../DashBoardNavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

import { db, auth } from "../../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


function BasicInfo() {
  const [userImage, setImage] = useState();
  const [firstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [userlocation, setLocation] = useState();
  const [userOrganization, setOrganization] = useState();
  const [userAbout, setAboutUser] = useState();
  const [userEducation, setUserEducation] = useState();
  const [userExpertIn, setUserExpertIn] = useState([]);
  const [userSkills, setUserSkills] = useState([]);




  //! fetch data
  useEffect(() => {
    const user = auth.currentUser;
    console.log(user)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        fetchUserData(uid);
      } else {
        // todo: display fetching data error..(server issue)
      }
    });
  }, []);

  let fetchUserData = async (uid) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (docSnap.exists()) {
      setImage(data.userImageUrl);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setLocation(data.location);
      setOrganization(data.organization);
      setAboutUser(data.about);
      setUserEducation(data.education);
      setUserExpertIn(data.expertsIn);
      setUserSkills(data.skills);
    } else {
      console.log("No such document!");
    }
  }

  // !  use update methord..
  let sentUsernsme = async (user,profilePicUrl) => {
    try {
      const docRef = doc(db, 'users', user.uid);
      setDoc(docRef, {
        //! bio
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

  async function sentModifiedDetailsToFirebase() {
    const auth = getAuth();
    const user = auth.currentUser;
    const storage = getStorage();
    const storageRef = ref(storage, `userProfile/${user.uid}/${userImage.name}`);
    let snapshot = await uploadBytes(storageRef, userImage);
    let url = await getDownloadURL(snapshot.ref);
    sentUsernsme(user,url);
    return;
  }

  const [formData, setFormData] = useState({});
  const [newSelectedImage, setNewSelectedImage] = useState(null);
  function updateField(field, value) {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const selectedTags = tags => {
    console.log(tags);
  };
  const uploadFile = (e) => {
    let file = e.target.files[0];
    console.log('file name 1  : ', file.name);
    setNewSelectedImage(URL.createObjectURL(file));
    if (file) {
      setImage(file);
    }
  }
  return (

    <div className="basicInfo">
      <DashBoardNavBoard />
      <EditBioNavBar />


      {/* <ComponentA formData={formData} updateField={updateField}/> */}
      {/* //! component A */}
      <div className="ComponentA">
        <div className="infotext">
          <FontAwesomeIcon className="icon7" icon={faCircleInfo} />
          <p>Add your Details</p>
        </div>
        <div className="Container" >
          {/* //!  name */}
          <div className="textfieldinfo">
            <p>First name</p>
          </div>
          <div className="textfield">
            <input type="text" id="lname" name="lname" placeholder="Username"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value) }}
            ></input>
          </div>
          <div className="textfieldinfo">
            <p>Last Name</p>
          </div>
          <div className="textfield">
            <input type="text" id="lname" name="lname" placeholder="Username"
              value={LastName}
              onChange={(e) => { setLastName(e.target.value) }}
            ></input>
          </div>
          {/* //! image select */}
          <div className="textfieldinfo">
            <p>Image</p>
          </div>
          <div className="textfield">
           {/* <div className="image-Button"> */}
            <img src={newSelectedImage!==null?newSelectedImage: userImage} alt='user' className="profile-image-edit" />
            {/* <img src={userImage} alt='user' className="profile-image-edit" /> */}
            <input type="file" name='Selct image' className="button90 img-select-button" onChange={uploadFile} />
         </div>
          {/* //! location */}
          <div className="addlocation">
            <p>Location</p>
            {/* <FontAwesomeIcon className="icon2" icon={faSquarePlus} /> */}
          </div>
          <div className="textfield">
            <input type="text" id="lname" name="lname" placeholder="Enter Your Location"
              value={userlocation}
              onChange={(e) => { setLocation(e.target.value) }}
            ></input>
          </div>
          {/* //! working at */}
          <div className="addlocation">
            <p>Working at</p>
            {/* <FontAwesomeIcon className="icon2" icon={faSquarePlus} /> */}
          </div>
          <div className="textfield">
            <input type="text" id="lname" name="lname" placeholder="Enter Your Organization"
              value={userOrganization}
              onChange={(e) => { setOrganization(e.target.value) }}
            ></input>
          </div>
          {/* //!  about */}
          <div className="textfieldinfo">
            <p>About</p>
          </div>
          <div className="textfield">
            <textarea className="textfield-about"
              rows="3"
              cols="45"
              name="description"
              placeholder="About You.."
              value={userAbout}
              onChange={(e) => { setAboutUser(e.target.value) }}
            >
            </textarea>
          </div>
          {/* //! Education */}
          <div className="addlocation">
            <p>Education</p>
            {/* <FontAwesomeIcon className="icon2" icon={faSquarePlus} /> */}
          </div>
          <div className="textfield">
            <input type="text" id="lname" name="lname" placeholder="Your Education Details.."
              value={userEducation}
              onChange={(e) => { setUserEducation(e.target.value) }}
            ></input>
          </div>
          {/* //! Tag Session 1  -- Expert In   */}
          <div className="addlocation">
            <p>Expert In</p>
          </div>
          <TagsInput selectedTags={selectedTags}
            tags={userExpertIn ?? []}
            setTags={tags => setUserExpertIn(tags)}
          />
          {/* //! Tag Session 2 -- Skills */}
          <div className="addlocation">
            <p>Skills</p>
          </div>
          <TagsInput selectedTags={selectedTags}
            tags={userSkills ?? []}
            setTags={tags => setUserSkills(tags)}
          />
        </div>
      </div>
      {/* //! */}
      <div className="dashbord-save-btn">
        <button className="btn btn-width" onClick={sentModifiedDetailsToFirebase}>Save</button>
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
      <input type="text" onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
        placeholder="Press enter to add tags" />
    </div>
  );
};

export default BasicInfo;
