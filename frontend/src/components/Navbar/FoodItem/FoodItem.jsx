import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../../assets/assets";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ itemId, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const itemCount = cartItems[itemId] || 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(itemId);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeFromCart(itemId);
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          src={`${url}/images/${image}`}
          alt={name}
          className="food-item-image"
        />

        {isLoggedIn && itemCount === 0 ? (
          <img
            className="add"
            onClick={handleAdd}
            src={assets.addIconWhite}
            alt="Add"
          />
        ) : itemCount > 0 ? (
          <div className="food-item-counter">
            <img onClick={handleRemove} src={assets.removeIcon} alt="Remove" />
            <p>{itemCount}</p>
            <img onClick={handleAdd} src={assets.addIconGreen} alt="Add" />
          </div>
        ) : null}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.ratingStarsImg} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
