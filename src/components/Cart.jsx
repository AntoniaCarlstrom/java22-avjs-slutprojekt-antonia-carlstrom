import React from "react";
import CartItem from "./CartItem";
import "../css/Cart.css";
import { useState } from "react";

function Cart({ cart, removeFromCart, addToCart, total, checkout, emptyCart }) {
  const [mouseEnter, setMouseEnter] = useState(false);
  const [mouseEnterEC, setMouseEnterEC] = useState(false);

  function handleMouseEnter() {
    setMouseEnter(true);
  }

  function handleMouseLeave() {
    setMouseEnter(false);
  }
  function handleMouseEnterEC() {
    setMouseEnterEC(true);
  }

  function handleMouseLeaveEC() {
    setMouseEnterEC(false);
  }

  return (
    <div className="Cart">
      <h1>Cart</h1>
      <ul>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
          />
        ))}
      </ul>
      <div className="checkout">
        <p>Total: {total} kr</p>
        <button
          onClick={checkout}
          style={{ backgroundColor: mouseEnter ? "black" : "white" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Checkout
        </button>
        <button
          onClick={emptyCart}
          style={{ backgroundColor: mouseEnterEC ? "black" : "white" }}
          onMouseEnter={handleMouseEnterEC}
          onMouseLeave={handleMouseLeaveEC}
        >
          Empty cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
