import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  console.log('Assets:', assets);
  return (
    <div className='navbar'>
      <div className="logo-container">
        <span className="logo">Tomato.</span>
        <span className='admin-panel'>Admin Panel</span>
      </div>
      {assets.profile_image ? (
        <img className='profile' src={assets.profile_image} alt="Profile"/>
      ) : (
        <p>Profile image not found</p>
      )}
    </div>
  )
}

export default Navbar