import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [food_list, setFoodList] = useState([]);
    
    const [token, setToken] = useState(() => {
        const savedToken = localStorage.getItem("token");
        return savedToken || "";
    });

    const addToCart = (itemId) => {
        console.log('itemId: ', itemId)
        console.log('cartItems: ', food_list)
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
        setCartItems({});
    };

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            console.log("Token stored in localStorage:", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`); // Fixed string interpolation here
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        };
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        url,
        token,
        setToken,
        logout 
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
