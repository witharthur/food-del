import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "https://food-del-t1rl.onrender.com";

  // Initialize token from localStorage
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken || "";
  });

  // Add retry mechanism for API calls
  const retryOperation = async (operation, maxRetries = 3) => {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
      }
    }
    throw lastError;
  };

  // Enhanced fetchFoodList with retry mechanism
  const fetchFoodList = useCallback(async () => {
    try {
      const response = await retryOperation(() => 
        axios.get(`${url}/api/food/list`)
      );
      
      if (response.data && response.data.data) {
        setFoodList(response.data.data);
      } else {
        throw new Error("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      throw error;
    }
  }, [url]);

  // Enhanced addToCart with loading state and error handling
  const addToCart = async (itemId) => {
    if (!token) {
      setError("Please login to add items to cart");
      return;
    }

    try {
      setIsLoading(true);
      await retryOperation(() =>
        axios.post(
          `${url}/api/cart/add`,
          { itemId },
          {
            headers: { token }
          }
        )
      );

      setCartItems(prev => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1
      }));

    } catch (error) {
      setError(`Failed to add item to cart: ${error.message}`);
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced removeFromCart with error handling
  const removeFromCart = async (itemId) => {
    if (!token) {
      setError("Please login to modify cart");
      return;
    }

    try {
      setIsLoading(true);
      await retryOperation(() =>
        axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          {
            headers: { token }
          }
        )
      );

      setCartItems(prev => {
        const updatedCart = { ...prev };
        if (updatedCart[itemId] > 1) {
          updatedCart[itemId] -= 1;
        } else {
          delete updatedCart[itemId];
        }
        return updatedCart;
      });

    } catch (error) {
      setError(`Failed to remove item from cart: ${error.message}`);
      console.error("Error removing from cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced logout with cleanup
  const logout = useCallback(() => {
    setToken("");
    setCartItems({});
    localStorage.removeItem("token");
    // Clear any existing errors
    setError(null);
  }, []);

  // Monitor food_list changes
  useEffect(() => {
    console.log("Food list updated:", food_list);
  }, [food_list]);

  // Handle token persistence
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      console.log("Token stored in localStorage:", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Initial data loading
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        await fetchFoodList();
        
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          // Optionally fetch cart data here if needed
        }
      } catch (err) {
        setError(`Failed to load initial data: ${err.message}`);
        console.error("Error loading initial data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [fetchFoodList]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const contextValue = {
    food_list,
    cartItems,
    isLoading,
    error,
    setCartItems,
    addToCart,
    removeFromCart,
    url,
    token,
    setToken,
    logout,
    refreshFoodList: fetchFoodList
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {isLoading && !food_list.length ? (
        <div className="loading-spinner">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        props.children
      )}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
