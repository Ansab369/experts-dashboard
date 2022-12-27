import React, { useState, useEffect } from "react";
import './session.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { db, auth } from "../../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import HashLoader from "react-spinners/HashLoader";


function Session({ currentStep, onBackIconClicked, nextButtonClicked }) {
  const steps = ["Bio", "Social", "Session", "Video"];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   addComponent();
  // }, []);
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

      }
    });
  }, []);

  let fetchUserData = async (uid) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    const fetchdata = docSnap.data();
    if (docSnap.exists()) {
      console.log('fetched data=========',fetchdata)
      console.log('data fetched ==========')
      console.log('data session ==========',fetchdata.sessionData)

      if(fetchdata.sessionData===undefined){
       addComponent();

        // setData(fetchdata.sessionData);
      }else{
        setData(fetchdata.sessionData);

      //  addComponent();

      }
    } else {
      console.log("No such document!");
    }
  }


  async function sentDataToFireBase() {
    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;
    
    const parsedData = await Promise.all(
      data.map(async (item)=>{
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
    nextButtonClicked();
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
        <div className="infotext">
          <FontAwesomeIcon className="icon7" icon={faCircleInfo} />
          <p>Add details your featured session With Totto Learning</p>
        </div>
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
      <div className="maxwidth" >
        <span className="iconbuttton" onClick={onBackIconClicked}>
          <FontAwesomeIcon className={currentStep === 1 ? "icon6" : "icon5"} id="backarrow" icon={faArrowLeft} />
        </span>
        <button
          className="btn"
          onClick={sentDataToFireBase}>
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
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
export default Session;
