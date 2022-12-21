import React from "react";
import './componentA.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faSquarePlus } from '@fortawesome/free-solid-svg-icons';


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



function ComponentA({ updateField, formData }) {

  const selectedTags = tags => {
    console.log(tags);
  };
  return (
    <div className="ComponentA">
      <div className="infotext">
        <FontAwesomeIcon className="icon7" icon={faCircleInfo} />
        <p>Add your Details</p>
      </div>
      <div className="Container" >
 {/* //!  name */}
        <div className="textfieldinfo">
          <p>Name</p>
        </div>
        <div className="textfield">
          <input type="text" id="lname" name="lname" placeholder="Username" value={formData['userName']} onChange={(e) => updateField('userName', e.target.value)}></input>
        </div>
 {/* //! image select */}
        <div className="textfieldinfo">
          <p>Image</p>
        </div>
        <div className="container-button1">
          <button className="button0">Select Image</button>
        </div>
 {/* //! location */}
        <div className="addlocation">
          <p>Location</p>
          {/* <FontAwesomeIcon className="icon2" icon={faSquarePlus} /> */}
        </div>
        <div className="textfield">
          <input type="text" id="lname" name="lname" placeholder="Enter Your Location" value={formData['location']} onChange={(e) => updateField('location', e.target.value)} ></input>
        </div>
 {/* //! working at */}
        <div className="addlocation">
          <p>Working at</p>
          {/* <FontAwesomeIcon className="icon2" icon={faSquarePlus} /> */}
        </div>
        <div className="textfield">
          <input type="text" id="lname" name="lname" placeholder="Enter Your Organization" value={formData['organization']} onChange={(e) => updateField('organization', e.target.value)} ></input>
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
                        value={formData['about']} 
                        onChange={(e) => updateField('about', e.target.value)}>
          </textarea>
        </div>
{/* //! Education */}
        <div className="addlocation">
          <p>Education</p>
          <FontAwesomeIcon className="icon2" icon={faSquarePlus} />
        </div>
        <div className="textfield">
          <input type="text" id="lname" name="lname" placeholder="Your Education Details.." value={formData['education']} onChange={(e) => updateField('education', e.target.value)}></input>
        </div>

 {/* //! Tag Session 1  -- Expert In   */}

        <div className="addlocation">
          <p>Expert In</p>
        </div>
        <TagsInput selectedTags={selectedTags} tags={formData.expertsIn ?? []} setTags={tags => updateField('expertsIn', tags)} />

  {/* //! Tag Session 2 -- Skills */}

        <div className="addlocation">
          <p>Skills</p>
        </div>
        <TagsInput selectedTags={selectedTags} tags={formData.skills ?? []} setTags={tags => updateField('skills', tags)} />
      </div>
    </div>
  );
}

export default ComponentA;
