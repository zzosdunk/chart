import { useState } from "react";
import "./Cart.css";

import { CartData } from "../Types/types";

interface CartProps {
  cartData: CartData;
  selectCart: (cart: CartData) => void;
  removeCart: (cart: CartData) => void;
}

const Cart = ({ cartData, selectCart, removeCart }: CartProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const selectCartHandler = () => {
    setIsSelected((prev) => !prev);
    selectCart(cartData);
  };

  const removeCartHandler = () => {
    setIsSelected(false);
    removeCart(cartData);
  };

  const cartStyles = isSelected ? "cartSelected" : "cart";

  return (
    <div className={cartStyles}>
      <p>Total cost: {cartData.total}</p>
      <button onClick={selectCartHandler}>Show Cart Data</button>
      <button className="delete-btn" onClick={removeCartHandler}>
        X
      </button>
    </div>
  );
};

export default Cart;
