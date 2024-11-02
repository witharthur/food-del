import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../components/Navbar/context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cartItems, food_list, removeFromCart, url } = useContext(StoreContext);
    const [promoCode, setPromoCode] = useState("");
    const navigate = useNavigate();

    const handleRemove = (itemId) => {
        console.log("Removing item with ID:", itemId);
        removeFromCart(itemId);
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

    const handlePromoSubmit = (e) => {
        e.preventDefault();
        console.log("Promo code submitted:", promoCode);
    };

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item) => {
                    const quantity = cartItems[item._id] || 0;
                    if (quantity > 0) {
                        return (
                            <div key={item.id}>
                                <div className="cart-items-title cart-items-item">
                                    <img
                                        src={`${url}/images/${item.image}`}
                                        className="cart-item-image"
                                        alt={item.name}
                                    />
                                    <p>{item.name}</p>
                                    <p>${parseFloat(item.price).toFixed(2)}</p>
                                    <p>{quantity}</p>
                                    <p>${(parseFloat(item.price) * quantity).toFixed(2)}</p>
                                    <button
                                        onClick={() => handleRemove(item._id)}
                                        className="cross"
                                    >
                                        x
                                    </button>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null; 
                })}
                <div className="cart-bottom">
                    <div className="cart-total-parent">
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
                                <button className="proceed-btn" onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                            </div>  
                        </div>
                        <div className="cart-promocode">
                            <p>If you have a promo code, enter it here:</p>
                            <form onSubmit={handlePromoSubmit} className="cart-promocode-input">
                                <input
                                    type="text"
                                    placeholder="promo code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
