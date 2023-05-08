import React from "react";
import "../css/CartItem.css";

function CartItem({ item, removeFromCart, addToCart }) {
  return (
    <div className="CartItem">
      <img src={item.imgSrc} alt={item.name} />
      <div className="CartItemName">{item.name} </div>
      <div className="CartItemPrice"> {item.price}:-</div>
      <div>Qty: {item.qty}</div>
      <button onClick={() => removeFromCart(item)}>-</button>
      <button onClick={() => addToCart(item)}>+</button>
    </div>
  );
}

export default CartItem;
