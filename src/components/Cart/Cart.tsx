import "./Cart.css";

import { CartData } from "../Types/types";

interface CartProps {
  cartData: CartData;
  selectCart: (cart: CartData) => void;
  removeCart: (cart: CartData) => void;
  isHighlighted: boolean;
}

const Cart = ({
  cartData,
  selectCart,
  removeCart,
  isHighlighted,
}: CartProps) => {
  const selectCartHandler = () => {
    selectCart(cartData);
  };

  const removeCartHandler = () => {
    removeCart(cartData);
  };

  const cartStyles = isHighlighted ? "cartSelected" : "cart";

  return (
    <div className={cartStyles}>
      <p>Total cost: {cartData.total}</p>
      <button className="showButton" onClick={selectCartHandler}>
        Show Cart Data
      </button>
      <button className="delete-btn" onClick={removeCartHandler}>
        X
      </button>
    </div>
  );
};

export default Cart;
