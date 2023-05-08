import React from "react";
import { Link } from "react-router-dom";
import logo from "../media/logo.png";
import "../css/Navbar.css";

function Navbar({ cart }) {
  const cartLength = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="Navbar">
      <div className="header">
        <img src={logo} alt="logo" />
        <h1>Hundshoppen</h1>
      </div>
      <div className="links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/cart">Cart ({cartLength})</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
