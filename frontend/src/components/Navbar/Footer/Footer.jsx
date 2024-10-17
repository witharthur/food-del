import React from 'react'
import './Footer.css'
import { assets } from '../../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        
        <div className="footer-content">
            <div className="footer-content-left">
            <div class="logo">Tomato</div>
            {/* <img src={assets.footerLogo} alt="" /> */}
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebookIcon} alt="" />
                    <img src={assets.twitterIcon} alt="" />
                    <img src={assets.linkedinIcon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+374-99-99-99-99</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
            
        </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 Tomato.com</p>
    </div>
  )
}

export default Footer
