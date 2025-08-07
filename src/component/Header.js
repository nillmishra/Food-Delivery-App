import { LOGO_URL } from "../utils/constant";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnName, setbtnName] = useState("Login");
  console.log("Header Render");

  //if no dependency array => useEffect is called on every render
  //if dependecy array is empty = [] => use Effect is called on initial render (just once)
  // if dependency array is [btnName] => Every time btnName is updated.

  useEffect(() => {
    console.log("useEffect Called");
  }, [btnName]);
  return (
    <div className="header">
      <div className="logo-container">
        <img src={LOGO_URL} className="logo" alt="Logo" />
      </div>
      <div className="navbar">
        <ul>
          <li>
            <Link className={"link-styles"} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={"link-styles"} to="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link className={"link-styles"} to="/contact">
              Contact Us
            </Link>
          </li>
          <li>
            <Link className={"link-styles"} to="">
              Cart
            </Link>
          </li>
          <li>
            <Link className={"link-styles"} to="/grocery">
              Grocery
            </Link>
          </li>
        </ul>
      </div>
        <button
          className="login"
          onClick={() => {
            btnName === "Login" ? setbtnName("Logout") : setbtnName("Login");
          }}
        >
          {btnName}
        </button>
    </div>
  );
};

export default Header;
