import React ,{useState} from "react";
import './componentA.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faSquarePlus ,faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import { db, auth } from "../../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


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



function ComponentA({currentStep,onBackIconClicked,nextButtonClicked}) {
  const steps = ["Bio", "Social", "Session", "Video"];
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [userlocation, setLocation] = useState('');
  const [userOrganization, setOrganization] = useState('');
  const [userAbout, setAboutUser] = useState('');
  const [userEducation, setUserEducation] = useState('');
  const [userExpertIn, setUserExpertIn] = useState([]);
  const [userSkills, setUserSkills] = useState([]);




  
  // !  use update methord..
  let sentUsernsme = async (user ,profilePicUrl) => {


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

  const [firstNameError,setFirstNameError]=useState('');
  const [secondNmeError,setSecondNameError]=useState('');
  const [profileError,setProfileError]=useState('');
  const [locationError,setLocationError]=useState('');
  const [organizationError,setOrganizationError]=useState('');
  const [aboutError,setAboutError]=useState('');
  const [educationError,setEducationError]=useState('');
  const [expertsInError,setExpertsInError]=useState('');
  const [skillsError,setSkillsError]=useState('');
    function Validation(){

      if(firstName===''){
        setFirstNameError('Enter First Name');
      }else if(firstName.length>=20){
        setFirstNameError('maximum 20 charactors');
      }else{
        setFirstNameError('');
      }


      if(LastName===''){
        setSecondNameError('Enter Last Name');
      }else if(LastName.length>=20){
        setSecondNameError('maximum 20 charactors');
      }
      else{
        setSecondNameError('');
      }

      if(profileImage===null){
        setProfileError('Upload profile pic');
      }else{
        setProfileError('');
      }

      if(userlocation===''){
        setLocationError('Enter your location');
      }else{
        setLocationError('');
      }

      if(userOrganization===''){
        setOrganizationError('Enter your Organization');
      }else{
        setOrganizationError('');
      }

      if(userAbout===''){
        setAboutError('Enter about you.');
      }else{
        setAboutError('');
      }

      if(userEducation===''){
        setEducationError('Enter your education details.');
      }else{
        setEducationError('');
      }

      if(userExpertIn.length===0){
        setExpertsInError('Enter your proffesion Tags.');
      }else{
        setExpertsInError('');
      }

      if(userSkills.length===0){
        setSkillsError('Enter your Skills');
      }else{
        setSkillsError('');
      }


    }

  
  async function sentDataToFireBase() {
    Validation();
      // console.log(firstNameError);

    // if(firstNameError!=''&& secondNmeError!=''&&profileError!='' &&locationError!=''&&organizationError!=''&&aboutError!=''&&educationError!=''&&expertsInError!=''&&skillsError!=''){
    if(firstName!=''&& LastName!=''&& profileImage!=null && userlocation!='' && userOrganization!='' && userAbout!='' &&userEducation!=''){
    const auth = getAuth();
    const user = auth.currentUser;
    const storage = getStorage();
    const storageRef = ref(storage, `userProfile/${user.uid}/${profileImage.name}`);
    let snapshot =await uploadBytes(storageRef, profileImage);
    let url = await getDownloadURL(snapshot.ref) ;
    sentUsernsme(user, url);
    nextButtonClicked();
  }
    return;
  }

 const uploadFile=(e)=> {
    let file = e.target.files[0];
     console.log('file name 1  : ',file.name);
    if (file) {
      setProfileImage(file);
    }
}

  const selectedTags = tags => {
    console.log(tags);
  };
  return (
    <div>
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
          <input type="text" id="lname" name="lname" placeholder="first name"
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
          <input type="text" id="lname" name="lname" placeholder="last name" 
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
          {/* <button className="button0" onClick={() => fileInput.current.click()}>Select Image</button> */}
          <input type="file" name='Selct image' className="button90" onChange={uploadFile}/>
        </div>
        {/* //! location */}
        <div className="textfieldinfo1">
          <p>Location</p>
          <div className="error-Text">
               <p>{locationError}</p>
          </div>
          {/* <FontAwesomeIcon className="icon2" icon={faSquarePlus} /> */}
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
          {/* <FontAwesomeIcon className="icon2" icon={faSquarePlus} /> */}
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
            onChange={(e) => { setAboutUser(e.target.value) }}
            >
          </textarea>
        </div>
        {/* //! Education */}
        <div className="textfieldinfo1">
          <p>Education</p>
          <div className="error-Text">
               <p>{educationError}</p>
          </div>
          {/* <FontAwesomeIcon className="icon2" icon={faSquarePlus} /> */}
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
      </div>
    </div>



    <div className="maxwidth" >
        <span className="iconbuttton" onClick={onBackIconClicked}>
          <FontAwesomeIcon className={currentStep === 1 ? "icon6" : "icon5"} id="backarrow" icon={faArrowLeft} />
        </span>
        <button
          className="btn"
          onClick={sentDataToFireBase}
          >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default ComponentA;
