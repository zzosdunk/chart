import { useState } from "react";

import { ItemData, CartData } from "../Types/types";
import ItemForm from "../Item/ItemForm";

import "./CreateCart.css";

interface CreateCartProps {
  addCart: (cart: CartData) => void;
  hideUI: () => void;
}

const CreateCart = ({ addCart, hideUI }: CreateCartProps) => {
  const [products, setProducts] = useState<ItemData[]>([]);
  const [error, setError] = useState("");

  const addNewItem = (item: ItemData) => {
    setProducts([...products, item]);
    setError("");
  };

  const addCartHandler = () => {
    if (products.length > 0) {
      const newCart: CartData = {
        id: Date.now(),
        products: products,
        totalProducts: products.length,
        total: products.reduce((total, product) => total + product.total, 0),
        userId: Date.now(),
      };

      addCart(newCart);
    } else {
      setError("Cannot add an empty cart. Please add products to your cart.");
    }
  };

  return (
    <>
      <div className="popup-wrapper">
        <div className="popup-box">
          <div className="popup-header">
            <h1 className="gradient__text">New Cart</h1>
          </div>
          <ItemForm addNewItem={addNewItem} />
          <hr />
          <div className="popup-header">
            <h2 className="gradient__text">
              Items in Cart ({products.length})
            </h2>
          </div>
          <ul>
            {products.map((item) => (
              <li key={item.id}>
                {item.title} ({item.quantity} x ${item.price.toFixed(2)}) = $
                {item.total.toFixed(2)}
              </li>
            ))}
          </ul>
          <div className="totalAmount">
            <h2>
              Total amount:{" "}
              <p>
                {products
                  .reduce((total, product) => total + product.total, 0)
                  .toFixed(2)}
              </p>
            </h2>
          </div>
          {error.trim().length > 0 && <p className="errorMessage">{error}</p>}
          <button onClick={addCartHandler} className="confirmCart">
            Add Cart
          </button>
        </div>
        <button className="popup-close" onClick={hideUI}>
          X
        </button>
      </div>
    </>
  );
};

export default CreateCart;
