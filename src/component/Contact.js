// import React, { useContext } from "react";
// import UserContext from "../utils/UserContext";
import React from "react";


const Contact = () => {
  // const {loggedInUser, setUserName} = useContext(UserContext); 

  return (
    <div>
      <h1>Contact Us</h1>
      {/* <div>
        loggedInUser: <span>{loggedInUser}</span>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="write username..."
          aria-label="Search"
          value={loggedInUser}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div> */}

      <div>
        <form>
            <input type="text" className="form-box" placeholder="name"/>
            <input type="text" className="form-box" placeholder="message"/>
            <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
