// src/component/Cart.js
import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CardList from "./CardList";
import { clearCart } from "../utils/cartSlice";
import {
  FiShoppingCart,
  FiTrash2,
  FiTag,
  FiArrowLeft,
  FiTruck,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const itemsCount = useMemo(
    () => cartItems.reduce((sum, it) => sum + (it.qty ?? it.quantity ?? 1), 0),
    [cartItems]
  );

  const getUnitPrice = (item) => {
    // Try to be robust with your data shape (Swiggy-like often uses paise)
    const raw =
      item.price ??
      item.defaultPrice ??
      item?.info?.price ??
      item?.price_in_cents ??
      0;
    return raw > 1000 ? raw / 100 : raw; // if paise -> rupees
  };

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, it) => sum + getUnitPrice(it) * (it.qty ?? it.quantity ?? 1),
        0
      ),
    [cartItems]
  );

  const deliveryFeeBase = subtotal > 499 ? 0 : 39;
  const tax = Math.round(subtotal * 0.05); // 5% example
  const [promoCode, setPromoCode] = useState("");
  const [applied, setApplied] = useState(""); // "SAVE20", "FREESHIP", "INVALID", or ""

  const discount = applied === "SAVE20" ? Math.round(subtotal * 0.2) : 0;
  const deliveryFee = applied === "FREESHIP" ? 0 : deliveryFeeBase;

  const total = Math.max(0, subtotal - discount + tax + deliveryFee);

  const formatINR = (n) =>
    n.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  const handleClearCart = () => dispatch(clearCart());

  const applyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "SAVE20" || code === "FREESHIP") setApplied(code);
    else setApplied("INVALID");
  };

  return (
    <div className="Cart-container cart-page">
      <div className="cart-header-row">
        <div className="cart-title">
          <FiShoppingCart size={22} />
          <h1>Cart</h1>
          <span className="cart-items-count">{itemsCount} items</span>
        </div>

        <div className="cart-actions">
          {cartItems.length > 0 && (
            <button className="btn-outline danger" onClick={handleClearCart}>
              <FiTrash2 />
              Clear cart
            </button>
          )}
          <Link to="/" className="btn-link">
            <FiArrowLeft />
            Continue shopping
          </Link>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">
            <FiShoppingCart size={40} />
          </div>
          <h3>Your cart is empty</h3>
          <p>Add tasty items from the menu to get started.</p>
          <Link className={"link-styles"} id="btn-primary"
          to="/">
            Browse restaurants
          </Link>

          <div className="cart-perks">
            <div className="perk">
              <FiTruck /> Free delivery over ₹499
            </div>
            <div className="perk">
              <FiShield /> 100% secure payments
            </div>
            <div className="perk">
              <FiCheckCircle /> No-contact delivery
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-left">
            <div className="cart-note">
              Enjoy fast checkout and exclusive offers 🎁
            </div>

            {/* Keep your existing list renderer */}
            <CardList items={cartItems} />
          </div>

          <div className="cart-right">
            <div className="summary-card">
              <div className="summary-header">Order Summary</div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? "Free" : formatINR(deliveryFee)}</span>
              </div>
              <div className="summary-row">
                <span>Taxes & charges</span>
                <span>{formatINR(tax)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row saving">
                  <span>Discount</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}

              <div className="cart-divider" />

              <div className="summary-total">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>

              <form className="promo-form" onSubmit={applyPromo}>
                <div className="input-group">
                  <span className="input-icon">
                    <FiTag />
                  </span>
                  <input
                    type="text"
                    placeholder="Have a coupon? e.g. SAVE20 or FREESHIP"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    aria-label="Promo code"
                  />
                  <button type="submit" className="btn-outline">
                    Apply
                  </button>
                </div>
                {applied === "INVALID" && (
                  <p className="promo-msg error">Invalid code</p>
                )}
                {(applied === "SAVE20" || applied === "FREESHIP") && (
                  <p className="promo-msg success">
                    Code applied: <strong>{applied}</strong>
                  </p>
                )}
              </form>

              <button className="btn-primary btn-checkout">Place order</button>

              <div className="summary-perks">
                <div className="perk">
                  <FiTruck /> Free delivery above ₹499
                </div>
                <div className="perk">
                  <FiShield /> Secure payments
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;