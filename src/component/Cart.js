// src/component/Cart.js
import { useSelector, useDispatch } from "react-redux";
import CardList from "./CardList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
const cartItems = useSelector((store) => store.cart.items);
const dispatch = useDispatch();

const handleClearCart = () => {
dispatch(clearCart());
};

return (
<div className="Cart-container">
<h1>Cart</h1>
{cartItems.length > 0 ? (
    <>
      <CardList items={cartItems} />
      <button onClick={handleClearCart}>Clear cart</button>
    </>
  ) : (
    <p>Your cart is empty.</p>
  )}
</div>
);
};

export default Cart;