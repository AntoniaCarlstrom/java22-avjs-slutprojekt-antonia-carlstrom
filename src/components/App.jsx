import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Products from "./Products";
import Cart from "./Cart";
import "../css/App.css";

const PRODUCTS_URL =
  "https://webshop2-e51d3-default-rtdb.europe-west1.firebasedatabase.app/products.json";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(PRODUCTS_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const addToCart = (product) => {
    const index = cart.findIndex((item) => item.id === product.id);
    const productInStock = products.find((item) => item.id === product.id);
    if (productInStock.qty === 0) {
      alert("Slut i lager");
      return;
    }
    if (index === -1) {
      setCart([...cart, { ...product, qty: 1 }]);
    } else {
      if (cart[index].qty < productInStock.qty) {
        const updatedCart = [...cart];
        updatedCart[index].qty += 1;
        setCart(updatedCart);
      } else {
        alert("Det finns tyvärr inte fler i lager");
      }
    }
  };

  const removeFromCart = (product) => {
    const index = cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[index].qty === 1) {
        updatedCart.splice(index, 1);
      } else {
        updatedCart[index].qty -= 1;
      }
      setCart(updatedCart);
    }
  };

  const updateFirebase = async (cart) => {
    const updates = {};
    cart.forEach((item) => {
      const originalQty = products.find(
        (product) => product.id === item.id
      ).qty;
      const newQty = originalQty - item.qty;
      updates[item.id] = {
        ...products.find((product) => product.id === item.id),
        qty: newQty,
      };
    });
    const response = await fetch(PRODUCTS_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Failed to update Firebase");
    }
  };

  const checkout = async () => {
    try {
      await updateFirebase(cart);
      setCart([]);
      alert("Tack för köpet, välkommen åter!");
      const response = await fetch(PRODUCTS_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert("Failed to update Firebase");
    }
  };

  const emptyCart = () => {
    setCart([]);
  };

  useEffect(() => {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.qty;
    });
    setTotal(sum);
  }, [cart]);

  return (
    <Router>
      <div>
        <Navbar cart={cart} />
        <Routes>
          <Route path="/" element={<h1>Välkommen till hundshoppen!</h1>} />
          <Route
            path="/products"
            element={
              <Products products={products} addToCart={addToCart} cart={cart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                addToCart={addToCart}
                total={total}
                checkout={checkout}
                emptyCart={emptyCart}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
