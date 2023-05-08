import React from "react";
import Product from "./Product";
import "../css/Products.css";

function Products({ products, addToCart, cart }) {
  return (
    <div className="Products">
      <h2 className="Products-title">Products</h2>
      <div className="Products-items">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            addToCart={addToCart}
            cart={cart}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
