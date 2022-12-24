import React,{useEffect,useState} from "react";
import './basic.css';
// import { Link} from 'react-router-dom';
import EditBioNavBar from '../EditBioNavBar'
// import Session from '../../../Stepper/Components/Session/Session';
import DashBoardNavBoard from '../../DashBoardNavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo ,faArrowLeft,faTrash} from '@fortawesome/free-solid-svg-icons';

import { db, auth } from "../../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


function FeaturedSession() {
  // const [userData, setData] = useState();
  const [data, setData] = useState([]);
  // const [featuredData, setfeaturedData] = useState();
  
  useEffect(() => {
    const user = auth.currentUser;
    console.log(user)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        fetchUserData(uid);
      } else {

      }
    });
  }, []);

  let fetchUserData = async (uid) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    const fetchdata = docSnap.data();
    if (docSnap.exists()) {
      console.log(fetchdata)
      setData(fetchdata.sessionData);
    } else {
      console.log("No such document!");
    }
  }
  // const [userSessionAbout, setSessionAbout] = useState();
  // const [userSessionLink, setSessionLink] = useState();

  //! fetch data
  // useEffect(() => {
  //   const user = auth.currentUser;
  //   console.log(user)
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       console.log(uid);
  //       fetchUserData(uid);
  //     } else {
  //     }
  //   });
  // }, []);

  // let fetchUserData = async (uid) => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   const docRef = doc(db, 'users', uid);
  //   const docSnap = await getDoc(docRef);
  //   const data = docSnap.data();
  //   if (docSnap.exists()) {
  //     setSessionData(data);
  //   } else {
  //     console.log("No such document!");
  //   }
  // }
  // !  use update methord..
  // let sentUsernsme = async (user) => {
  //   try {
  //     const docRef = doc(db, 'users', user.uid);
  //     setDoc(docRef, {
  //       //! bio  //! is null check needed..  seting to firebase..
  //       // sessionTitle: userSessionTitle ?? '',
  //       // sessionAbout: userSessionAbout ?? '',
  //       // sessionLink: userSessionLink ?? '',
  //     }, { merge: true });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: =======", e);
  //   }
  // }

  function sentModifiedDetailsToFirebase() {
    const auth = getAuth();
    const user = auth.currentUser;
    // sentUsernsme(user);
    sentDataToFireBase();
    return;
  }

  async function sentDataToFireBase() {
    const auth = getAuth();
    const user = auth.currentUser;
    
    const parsedData = await Promise.all(
      data.map(async (item)=>{
        if(typeof item.image==='string'){
          return item;
        }
        const storage = getStorage();
        const storageRef = ref(storage, `userProfile/${user.uid}/sessions/${item.image.name}`);  
        let snapshot = await uploadBytes(storageRef, item.image);
        let url = await getDownloadURL(snapshot.ref);
        return {
          ...item,
          image: url
        }        
      })
    );

    const docRef = doc(db, 'users', user.uid);
      
    setDoc(docRef, {
      sessionData: parsedData,
    }, { merge: true });
    return;
  }

  function addComponent() {
    console.log(data);
    setData(
      [...data, {
        'title': "",
        'image': "",
        'about': "",
        'link': "",
      }]
    )
  }

  function deleteRow(e) {
    data.splice(e, 1)
    console.log(data)
    setData([...data])
  }

  return (
    <div className="featuredSession">
      <DashBoardNavBoard />
      <EditBioNavBar />
      {/*//! <Session/>  */}
      <div className="ComponentA">
        <div className="infotext">
          <FontAwesomeIcon className="icon7" icon={faCircleInfo} />
          <p>Add or edit details of your featured session With Totto Learning</p>
        </div>





        <div>
      <div className="ComponentA">
        <div className="Container" >
          {/* //! */}
          {data.map((e, i) => (
            <Form key={i} data={e} onUpdateField={(field, value) => { data[i][field] = value; setData([...data]) }} onDelete={() => deleteRow(i)} />
          ))}
          {/* //!  add more button */}
          <div className="socialbutton">
            <button className="button2" onClick={addComponent}>Add More</button>
          </div>
        </div>
      </div>

    </div>



        {/* <div className="Container" >
          <div className="social-container">
            <div>
              <div className="textfieldtitle">
                <p>Title</p>
              </div>
              <div className="textfieldSocial2">
                <input type="text" id="lname" name="lname" placeholder="Featured Session Title"
                  value={userSessionTitle}
                  onChange={(e) => { setSessionTitle(e.target.value) }}></input>
              </div>
              <div className="textfieldtitle">
                <p>Image</p>
              </div>
              <div className="image-button1">
                <button className="button5">Select Image</button>
              </div>
              <div className="textfieldtitle">
                <p>About</p>
              </div>
              <div className="textfieldSocial2">
                <textarea rows="3" cols="45" name="description" placeholder="Short Discription About Your Session"
                value={userSessionAbout}
                onChange={(e) => { setSessionAbout(e.target.value) }}>
                </textarea>
              </div>
              <div className="textfieldtitle">
                <p>Link</p>
              </div>
              <div className="textfieldSocial2">
                <input type="text" id="lname" name="lname" placeholder="Featured Session Link"
                value={userSessionLink}
                onChange={(e) => { setSessionLink(e.target.value) }}></input>
              </div>
            </div>
          </div>
          <div className="socialbutton">
            <button className="button2">Add More</button>
          </div>
        </div> */}



        
      </div>
            <div className="dashbord-save-btn">
        <button className="btn btn-width" onClick={sentModifiedDetailsToFirebase}>Save</button>
      </div>

    </div>
  );
}

function Form({ data, onDelete, onUpdateField, setSessionImage }) {
  const uploadFile = (e) => {
    let file = e.target.files[0];
    console.log('file name 1  : ', file.name);
    if (file) {
      onUpdateField('image', file)
      // let data = new FormData();
    }
  }
  return <div className="social-container">
    <div>
      {/* //!  { 1 } */}
      <div className="textfieldtitle top-Padding">
        <FontAwesomeIcon className="icon49" icon={faTrash} onClick={onDelete} />
        <p>Title</p>
      </div>
      <div className="textfieldSocial2">
        <input type="text" id="lname" name="lname" placeholder="Featured Session Title" value={data.title} onChange={(e) => onUpdateField('title', e.target.value)}></input>
      </div>
      {/* //!  { 2 } */}
      <div className="textfieldtitle">
        <p>Image</p>
      </div>
      <div className="textfieldSocial2">
        <input type="file" name='Selct image' className="button90" onChange={uploadFile} />
        {/* <button className="button5">Select Image</button> */}
      </div>
      {/* //!  about */}
      <div className="textfieldtitle">
        <p>About</p>
      </div>
      <div className="textfieldSocial2">
        <textarea rows="3" cols="45" name="description" placeholder="Short Discription About Your Session" value={data.about} onChange={(e) => onUpdateField('about', e.target.value)}>
        </textarea>
      </div>
      {/* //!  { 4 } */}
      <div className="textfieldtitle">
        <p>Link</p>
      </div>
      <div className="textfieldSocial2">
        <input type="text" id="lname" name="lname" placeholder="Featured Session Link" value={data.link} onChange={(e) => onUpdateField('link', e.target.value)}></input>
      </div>
    </div>
  </div>

}

export default FeaturedSession;
