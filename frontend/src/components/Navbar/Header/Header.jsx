import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className="header" id="home">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <button>View Menu</button>
      </div>
      <img src="/path-to-your-food-image.jpg" alt="Delicious meal" className="header-image" />
    </div>
  )
}

export default Header