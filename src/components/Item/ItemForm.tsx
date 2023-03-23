import { useState } from "react";

import { ItemData } from "../Types/types";

import "./ItemForm.css";

interface ItemFormProps {
  addNewItem: (item: ItemData) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ addNewItem }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim().length !== 0 && price > 0) {
      const newItem: ItemData = {
        id: Date.now(),
        title,
        price,
        quantity,
        total: price * quantity,
        discountPercentage: 35,
        discountedPrice: price * quantity * 35,
      };
      addNewItem(newItem);
      setTitle("");
      setPrice(0);
      setQuantity(1);
      setError("");
    } else {
      setError("Please fill out all of the fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Title:</span>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label>
        <span>Price:</span>
        <input
          type="number"
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
        />
      </label>
      <label>
        <span>Quantity:</span>
        <input
          type="number"
          min={1}
          max={10}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        />
      </label>
      <button type="submit" className="addProductButton">
        Add Product to Cart
      </button>
      {error.trim().length > 0 && <p className="errorMessage">{error}</p>}
    </form>
  );
};

export default ItemForm;
