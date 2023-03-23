import React, { useState, useEffect } from "react";

import "./CartsPage.css";
import Cart from "../Cart/Cart";
import { CartData } from "../Types/types";
import useFetchCartsData from "../hooks/useCarts";

import Chart from "../Chart/Chart";
import CreateCart from "../CreateCart/CreateCart";

import addCart from "../../assets/addCartIcon.png";

const API_URL = "https://dummyjson.com/carts";

const CartsPage: React.FC = () => {
  const [selectedCart, setSelectedCart] = useState<CartData>();

  const { carts, isLoading, error } = useFetchCartsData(API_URL);
  const [sortedCarts, setSortedCarts] = useState<CartData[]>(carts);
  const [showAddCart, setShowAddCart] = useState(false);

  useEffect(() => {
    setSortedCarts(carts);
  }, [carts]);

  const handleCartClick = (cart: CartData) => {
    if (selectedCart && selectedCart.id === cart.id) {
      setSelectedCart(undefined);
    } else {
      setSelectedCart(cart);
    }
  };

  const handleRemoveCart = (cart: CartData) => {
    setSortedCarts(sortedCarts.filter((c) => c.id !== cart.id));
    setSelectedCart(undefined);
  };

  const handleAddCartUI = () => {
    setShowAddCart((prev) => !prev);
  };

  const addNewCartHandler = (newCart: CartData) => {
    setSortedCarts([...sortedCarts, newCart]);

    hideAddCartUI();
  };

  const hideAddCartUI = () => {
    setShowAddCart(false);
  };

  return (
    <>
      <div className="gradient__bg">
        <div className="header-content">
          <h1 className="gradient__text">Available Carts</h1>
        </div>
        {error && <p className="errorMessage">{error}</p>}
        {showAddCart && (
          <CreateCart addCart={addNewCartHandler} hideUI={hideAddCartUI} />
        )}

        <div className="container">
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            Array.isArray(carts) &&
            sortedCarts.map((cart) => (
              <div className="cart-item" key={cart.id}>
                <Cart
                  cartData={cart}
                  selectCart={handleCartClick}
                  removeCart={handleRemoveCart}
                  isHighlighted={selectedCart?.id === cart.id}
                />
              </div>
            ))
          )}
        </div>
        <button onClick={handleAddCartUI} className="addCartButton">
          <img src={addCart} alt="add cart" />
        </button>
        <div className="chart">
          <Chart cartToShow={selectedCart} />
        </div>
      </div>
    </>
  );
};

export default CartsPage;
