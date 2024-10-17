import React from 'react'
import './PlaceOrder.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../components/Navbar/context/StoreContext'



const PlaceOrder = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return food_list.reduce((total, item) => {
      const quantity = cartItems[item.id] || 0;
      return total + parseFloat(item.price) * quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 2;
  const total = subtotal + deliveryFee;

  return (
    <form className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        
        {/* First name and Last name in a row */}
        <div className="multi-fields">
          <input type="text" className="input" placeholder='First name'/>
          <input type="text" className="input" placeholder='Last name'/>
        </div>
        
        {/* Email */}
        <input type="email" className="input" placeholder='Email address'/>
        
        {/* Street */}
        <input type="text" className="input" placeholder='Street'/>
        
        {/* City and State in a row */}
        <div className="multi-fields">
          <input type="text" className="input" placeholder='City'/>
          <input type="text" className="input" placeholder='State'/>
        </div>
        
        {/* Zip code and Country in a row */}
        <div className="multi-fields">
          <input type="text" className="input" placeholder='Zip code'/>
          <input type="text" className="input" placeholder='Country'/>
        </div>

        {/* Phone */}
        <input type="tel" className="input" placeholder='Phone'  pattern="\+?[0-9]*"/>
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
            <button className="proceed-btn" onClick={() => navigate('/order')}>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
