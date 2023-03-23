import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";

import { CartData, ItemData } from "../Types/types";

const cartData: CartData = {
  id: 1,
  total: 110,
  products: [
    {
      id: 1,
      title: "Product 1",
      price: 50,
      discountedPrice: 40,
      quantity: 1,
      total: 50,
    },
    {
      id: 2,
      title: "Product 2",
      price: 30,
      discountedPrice: 20,
      quantity: 2,
      total: 60,
    },
  ],
  totalProducts: 2,
  userId: 1,
};

test("renders cart data", () => {
  render(
    <Cart
      cartData={cartData}
      selectCart={jest.fn()}
      removeCart={jest.fn()}
      isHighlighted={false}
    />
  );
  const totalCost = screen.getByText(/total cost:/i);
  expect(totalCost).toHaveTextContent("Total cost: 110");

  const showButton = screen.getByRole("button", { name: /show cart data/i });
  expect(showButton).toBeInTheDocument();

  const deleteButton = screen.getByRole("button", { name: /x/i });
  expect(deleteButton).toBeInTheDocument();
});

test("calls selectCart when show button is clicked", () => {
  const selectCartMock = jest.fn();
  render(
    <Cart
      cartData={cartData}
      selectCart={selectCartMock}
      removeCart={jest.fn()}
      isHighlighted={false}
    />
  );
  const showButton = screen.getByRole("button", { name: /show cart data/i });
  fireEvent.click(showButton);
  expect(selectCartMock).toHaveBeenCalledWith(cartData);
});

test("calls removeCart when delete button is clicked", () => {
  const removeCartMock = jest.fn();
  render(
    <Cart
      cartData={cartData}
      selectCart={jest.fn()}
      removeCart={removeCartMock}
      isHighlighted={false}
    />
  );
  const deleteButton = screen.getByRole("button", { name: /x/i });
  fireEvent.click(deleteButton);
  expect(removeCartMock).toHaveBeenCalledWith(cartData);
});
