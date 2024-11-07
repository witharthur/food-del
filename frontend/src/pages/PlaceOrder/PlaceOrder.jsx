import React, { useState, useContext, useEffect } from 'react';
import './PlaceOrder.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../components/Navbar/context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { cartItems, food_list, token, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const calculateSubtotal = () => {
    return food_list.reduce((total, item) => {
      const quantity = cartItems[item._id] || 0;
      return total + parseFloat(item.price) * quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 2;
  const total = subtotal + deliveryFee;

  const placeOrder = async (event) => {
    event.preventDefault();
    
    // Create order items array
    let orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        _id: item._id,
        name: item.name,
        price: parseFloat(item.price),
        quantity: cartItems[item._id]
      }));

    // Create order data object
    let orderData = {
      userId: token,
      items: orderItems,
      amount: total,
      address: data
    };

    console.log("Sending order data:", orderData); // Debug log

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token }
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }
    else if(calculateSubtotal()===0){navigate('/cart')}
  })
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input 
            required 
            type="text" 
            name="firstName" 
            onChange={onchangeHandler} 
            value={data.firstName} 
            className="input" 
            placeholder="First name" 
          />
          <input 
            required 
            type="text" 
            name="lastName" 
            onChange={onchangeHandler} 
            value={data.lastName} 
            className="input" 
            placeholder="Last name" 
          />
        </div>

        <input 
          required 
          type="email" 
          name="email" 
          onChange={onchangeHandler} 
          value={data.email} 
          className="input" 
          placeholder="Email address" 
        />

        <input 
          required 
          type="text" 
          name="street" 
          onChange={onchangeHandler} 
          value={data.street} 
          className="input" 
          placeholder="Street" 
        />

        <div className="multi-fields">
          <input 
            required 
            type="text" 
            name="city" 
            onChange={onchangeHandler} 
            value={data.city} 
            className="input" 
            placeholder="City" 
          />
          <input 
            required 
            type="text" 
            name="state" 
            onChange={onchangeHandler} 
            value={data.state} 
            className="input" 
            placeholder="State" 
          />
        </div>

        <div className="multi-fields">
          <input 
            required 
            type="text" 
            name="zipcode" 
            onChange={onchangeHandler} 
            value={data.zipcode} 
            className="input" 
            placeholder="Zip code" 
          />
          <input 
            required 
            type="text" 
            name="country" 
            onChange={onchangeHandler} 
            value={data.country} 
            className="input" 
            placeholder="Country" 
          />
        </div>

        <input 
          required 
          type="tel" 
          name="phone" 
          onChange={onchangeHandler} 
          value={data.phone} 
          className="input" 
          placeholder="Phone" 
          pattern="\+?[0-9]*" 
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${deliveryFee.toFixed(2)}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>${total.toFixed(2)}</b>
          </div>
          <div>
            <button type="submit" className="proceed-btn">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;