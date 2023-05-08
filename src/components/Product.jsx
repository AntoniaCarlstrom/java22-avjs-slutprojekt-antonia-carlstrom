import React from "react";
import "../css/Product.css";

function Product({ product, addToCart, cart }) {
  const productInStock = product.qty > 0;
  const productInCart = cart.find((item) => item.id === product.id);

  const handleClick = () => {
    if (productInStock && (!productInCart || productInCart.qty < product.qty)) {
      addToCart(product);
    }
  };

  return (
    <div className="Product">
      <h2>{product.name}</h2>
      <img src={product.imgSrc} alt={product.name} />

      <div>{product.price} kr</div>

      <button
        onClick={handleClick}
        disabled={
          !productInStock ||
          (productInCart && productInCart.qty === product.qty)
        }
      >
        {productInStock
          ? productInCart
            ? "Add more"
            : "Add to cart"
          : "Out of stock"}
      </button>
    </div>
  );
}

export default Product;
