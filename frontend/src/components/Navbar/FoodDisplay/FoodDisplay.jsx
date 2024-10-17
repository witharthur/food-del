import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list.map((item) => {
          // Use `item.id` instead of `item._id` and ensure category filtering works
          if (category === 'All' || category === item.category) {
            return (
              <FoodItem
                key={item.id}  // Use `item.id` as the key
                id={item.id}  // Ensure this matches the ID property in FoodItem
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null; // Ensure that map always returns something
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
