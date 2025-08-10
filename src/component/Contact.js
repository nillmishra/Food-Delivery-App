import React, { useContext } from "react";
import UserContext from "../utils/UserContext";

const Contact = () => {
  const {loggedInUser, setUserName} = useContext(UserContext); 

  return (
    <div>
      <div>
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
      </div>
    </div>
  );
};

export default Contact;
