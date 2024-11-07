import React from "react";
import "./Footer.css";
import { assets } from "../../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="logo">Tomato</div>
          <p>
            At Tomato, we believe that great food starts with the freshest
            ingredients and a passion for creating dishes that nourish the body
            and delight the senses. Our philosophy is simple: serve
            high-quality, seasonal ingredients in ways that highlight their
            natural flavors, without unnecessary complexity. Every dish at
            Tomato is crafted with care and attention to detail, bringing out
            the best in each ingredient.
            <br />
            Our menu draws inspiration from Mediterranean traditions, where food
            is not just about eating but about sharing moments with friends and
            family. From vibrant salads and rustic pizzas to rich pasta dishes
            and flavorful entrees, we offer a wide variety of choices that cater
            to every taste. Whether you’re a fan of hearty classics or looking
            for something light and fresh, you’ll find something to love at
            Tomato.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebookIcon} alt="Facebook" />
            <img src={assets.twitterIcon} alt="Twitter" />
            <img src={assets.linkedinIcon} alt="LinkedIn" />
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
            <li>+374-98-45-59-49</li>
            <li>arthurdadalian@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        {" "}
        © 2024 Tomato. All rights reserved. Created with care by Arthur Dadalian
      </p>
    </div>
  );
};

export default Footer;
