import React, { useState, useEffect } from "react";

import "./CartsPage.css";
import Cart from "../Cart/Cart";
import { CartData } from "../Types/types";
import useFetchCartsData from "../hooks/useCarts";

import Chart from "../Chart/Chart";

const API_URL = "https://dummyjson.com/carts";

const CartsPage: React.FC = () => {
  const [selectedCart, setSelectedCart] = useState<CartData>();

  const { carts, isLoading } = useFetchCartsData(API_URL);
  const [sortedCarts, setSortedCarts] = useState<CartData[]>(carts);

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

  return (
    <>
      <div className="gradient__bg">
        <div className="header-content">
          <h1 className="gradient__text">Available Carts</h1>
        </div>

        <div className="container">
          {Array.isArray(carts) &&
            sortedCarts.map((cart) => (
              <div className="cart-item" key={cart.id}>
                <Cart
                  cartData={cart}
                  selectCart={handleCartClick}
                  removeCart={handleRemoveCart}
                  isHighlighted={selectedCart?.id === cart.id}
                />
              </div>
            ))}
        </div>
        <div className="chart">
          <Chart cartToShow={selectedCart} />
        </div>
      </div>
    </>
  );
};

export default CartsPage;
