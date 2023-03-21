import React, { useState, useEffect, useCallback } from "react";

import "./CartsPage.css";
import Cart from "./Cart";
import { CartData } from "../Types/types";

const API_URL = "https://dummyjson.com/carts";

const CartsPage: React.FC = () => {
  const [carts, setCarts] = useState<CartData[]>([]);
  const [selectedCart, setSelectedCart] = useState<CartData>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchCharactersData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Something went wrong on fetching!");
      }

      const data = await response.json();
      console.log(data.carts);
      setCarts(data.carts);
    } catch (error) {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharactersData();
  }, [fetchCharactersData]);

  const handleCartClick = (cart: CartData) => {
    setSelectedCart(cart);
  };

  const handleRemoveCart = (cart: CartData) => {
    setCarts(carts.filter((c) => c.id !== cart.id));
    setSelectedCart(cart);
  };

  return (
    <>
      <h1>Dashboard</h1>
      <div className="container">
        {Array.isArray(carts) &&
          carts.map((cart) => (
            <div className="cart-item">
              <Cart
                cartData={cart}
                selectCart={handleCartClick}
                removeCart={handleRemoveCart}
              />
            </div>
          ))}
      </div>
      {selectedCart && (
        <div className="cart-details">
          <h2>Produkty w koszyku {selectedCart.id}</h2>
          <canvas id="chart" />
        </div>
      )}
    </>
  );
};

export default CartsPage;
