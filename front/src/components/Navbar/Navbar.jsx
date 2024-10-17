import React, { useCallback, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';  
import "./Navbar.css"
import { assets } from '../../assets/assets'
import { useContext } from 'react';
import { StoreContext } from './context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const location = useLocation();
    
    const { cartItems } = useContext(StoreContext);
    
    const checkIfCartIsEmpty = useCallback(() => {
        const keys = Object.keys(cartItems);
        if (!keys.length) {            
            return true;
        }
        for (let i of keys) {            
            if (cartItems[i]) {
                return false;
            }
        }
        return true;
    }, [cartItems])

    const scrollToSection = (sectionId, offset = 0) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            smoothScroll(elementPosition - offset, 1000); // Adjust duration as needed
        }
    }

    const smoothScroll = (targetPosition, duration) => {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Track scroll position and update the active link
    const handleScroll = () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition < 50) {
            setMenu("home");
        } else if (scrollPosition >= document.getElementById("food-display").offsetTop - 100) {
            setMenu("menu");
        } else if (scrollPosition >= document.getElementById("app-download").offsetTop - 100) {
            setMenu("mobile-app");
        } else if (scrollPosition >= document.getElementById("footer").offsetTop - 100) {
            setMenu("contact-us");
        }
    };

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
            scrollToSection(hash);
        }
    }, [location]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='navbar'>
            <Link to='/'><div class="logo">Tomato</div>
            </Link>
            <ul className='navbar-menu'>
                <li onClick={() => { setMenu("home"); scrollToSection('home'); }} className={menu === "home" ? "active" : ""}>
                    <Link to="/#home">home</Link>
                </li>
                <li onClick={() => { setMenu("menu"); scrollToSection('food-display', -1); }} className={menu === "menu" ? "active" : ""}>
                    <Link to="/#menu">menu</Link>
                </li>
                <li onClick={() => { setMenu("mobile-app"); scrollToSection('app-download',310); }} className={menu === "mobile-app" ? "active" : ""}>
                    <Link to="/#mobile-app">mobile-app</Link>
                </li>
                <li onClick={() => { setMenu("contact-us"); scrollToSection('footer'); }} className={menu === "contact-us" ? "active" : ""}>
                    <Link to="/#contact_us">contact us</Link>
                </li>
            </ul>
            <div className="navbar-right">
                <img src={assets.searchIcon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basketIcon} alt="" /></Link>
                    {!checkIfCartIsEmpty() && <div className="dot"></div>}
                </div>
                <button onClick={() => setShowLogin(true)}>sign in</button>
            </div>
        </div>
    )
}

export default Navbar;
