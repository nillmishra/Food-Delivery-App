import { LOGO_URL } from "../utils/constant";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
const Header = () => {
  const [btnName, setbtnName] = useState("Login");
  console.log("Header Render");

  const {loggedInUser} = useContext(UserContext);

  //suscribing to the store using selctor

  const cartItems = useSelector((store) => store.cart.items);
const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  console.log(cartItems)
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
            <Link className={"link-styles"} to="/grocery">
              Grocery
            </Link>
          </li>
        </ul>
      </div>
      
        <div className="user-id-box">
          <div>
            <Link className="link-styles cart-icon-wrapper" to="/cart" aria-label="Cart">
              <AiOutlineShoppingCart size={22} />
              <span className="cart-badge">{cartCount}</span>
            </Link>
          </div>
          <button
          className="login"
          onClick={() => {
            btnName === "Login" ? setbtnName("Logout") : setbtnName("Login");
          }}
        >
          {btnName}
        </button>
        <p>{loggedInUser}</p>
        </div>
        
    </div>
  );
};

export default Header;
