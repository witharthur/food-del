import React, { useContext } from 'react';
import './FoodItem.css';  // Import CSS for styling
import { assets } from '../../../assets/assets';  // Import assets like icons and images
import { StoreContext } from '../context/StoreContext';  // Import StoreContext to manage cart state

const FoodItem = ({ id, name, price, description, image }) => {
  // Access cartItems, addToCart, and removeFromCart from StoreContext using useContext
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="food-item"> {/* Main container for the food item */}
      <div className="food-item-img-container"> {/* Container for image and counter */}
        <img src={image} alt={name} className="food-item-image" />  {/* Display food image */}

        {/* Check if the item exists in the cart */}
        {!cartItems[id] ? (
          <img
            className="add"  // Button to add item to cart
            onClick={() => addToCart(id)}
            src={assets.addIconWhite}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter"> {/* Display counter if item is in cart */}
            <img
              onClick={() => removeFromCart(id)}  // Button to remove item from cart
              src={assets.removeIcon}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>  {/* Display number of items in cart */}
            <img
              onClick={() => addToCart(id)}  // Button to increase item quantity in cart
              src={assets.addIconGreen}
              alt="Add"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">  {/* Container for food details */}
        <div className="food-item-name-rating">  {/* Display name and rating */}
          <p>{name}</p>
          <img src={assets.ratingStarsImg} alt="Rating" />  {/* Placeholder for rating image */}
        </div>
        <p className="food-item-desc">{description}</p>  {/* Display food description */}
        <p className="food-item-price">${price}</p>  {/* Display price */}
      </div>
    </div>
  );
};

export default FoodItem;
