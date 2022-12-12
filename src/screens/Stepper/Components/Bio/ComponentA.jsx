import React from "react";
import './componentA.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo , faSquarePlus } from '@fortawesome/free-solid-svg-icons';



const TagsInput = props => {
	const [tags, setTags] = React.useState(props.tags);
	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};
	return (
		<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'onClick={() => removeTags(index)}>x</span>
					</li>
				))}
			</ul>
			<input type="text"onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
				placeholder="Press enter to add tags"/>
		</div>
	);
};



function ComponentA() {
  const selectedTags = tags => {
		console.log(tags);
	};
  return (
    <div className="ComponentA">
        <div className="infotext">
            <FontAwesomeIcon className="icon7" icon= {faCircleInfo} />
            <p>Add your Details</p>
        </div>
        <div className="Container" >
        {/* //!  name */}
          <div className="textfieldinfo">
          <p>Name</p>
          </div>
            <div className="textfield">
                <input type="text" id="lname" name="lname"placeholder="Username" ></input>
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
          <FontAwesomeIcon className="icon2" icon= {faSquarePlus} />
          </div>
            <div className="textfield">
                <input type="text" id="lname" name="lname"placeholder="Enter Your Location" ></input>
            </div>

            {/* //!  about */}
          <div className="textfieldinfo">
          <p>About</p>
          </div>
            <div className="textfield">
            <textarea className="textfield-about" rows = "3" cols = "45" name = "description" placeholder="About You..">
             
          </textarea>
            </div>
             {/* //! Education */}
        <div className="addlocation">
          <p>Education</p>
          <FontAwesomeIcon className="icon2" icon= {faSquarePlus} />
          </div>
            <div className="textfield">
                <input type="text" id="lname" name="lname" placeholder="Your Education Details.." ></input>
            </div>

                 {/* //! Tag Session 1 */}

        <div className="addlocation">
          <p>Expert In</p>
          </div>
          <TagsInput selectedTags={selectedTags}  tags={['Parenting Mentor']}/>

              {/* //! Tag Session 2 */}

          <div className="addlocation">
                  <p>Skills</p>
                  </div>
                  <TagsInput selectedTags={selectedTags}  tags={['Reading']}/>

        </div>
    </div>
  );
}

export default ComponentA;
