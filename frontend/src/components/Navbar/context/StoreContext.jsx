import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const CACHE_DURATION = 5 * 60 * 1000; 
const FOOD_LIST_CACHE_KEY = 'foodListCache';
const CART_ITEMS_CACHE_KEY = 'cartItemsCache';

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const cachedCart = localStorage.getItem(CART_ITEMS_CACHE_KEY);
    return cachedCart ? JSON.parse(cachedCart) : {};
  });
  
  const url = "https://food-del-t1rl.onrender.com";
  const [food_list, setFoodList] = useState(() => {
    const cachedData = localStorage.getItem(FOOD_LIST_CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
    return [];
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken || "";
  });

  // Кэширование корзины
  useEffect(() => {
    localStorage.setItem(CART_ITEMS_CACHE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (itemId) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response);

      setCartItems((prev) => {
        const newCart = {
          ...prev,
          [itemId]: (prev[itemId] || 0) + 1
        };
        localStorage.setItem(CART_ITEMS_CACHE_KEY, JSON.stringify(newCart));
        return newCart;
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => {
      const newCart = {
        ...prev,
        [itemId]: prev[itemId] - 1
      };
      
      // Удаляем товар, если количество стало 0 или меньше
      if (newCart[itemId] <= 0) {
        delete newCart[itemId];
      }
      
      localStorage.setItem(CART_ITEMS_CACHE_KEY, JSON.stringify(newCart));
      return newCart;
    });
  }, []);

  const logout = useCallback(() => {
    setToken("");
    setCartItems({});
    localStorage.removeItem("token");
    localStorage.removeItem(CART_ITEMS_CACHE_KEY);
  }, []);

  // Кэширование списка продуктов
  const fetchFoodList = useCallback(async (force = false) => {
    try {
      const cachedData = localStorage.getItem(FOOD_LIST_CACHE_KEY);
      
      if (!force && cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setFoodList(data);
          return;
        }
      }

      const response = await axios.get(`${url}/api/food/list`);
      const foodData = response.data.data;
      
      setFoodList(foodData);
      
      // Сохраняем данные в кэш с временной меткой
      localStorage.setItem(FOOD_LIST_CACHE_KEY, JSON.stringify({
        data: foodData,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  }, [url]);

  // Функция для принудительного обновления данных
  const refreshData = useCallback(() => {
    return fetchFoodList(true);
  }, [fetchFoodList]);

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    };
    loadData();
  }, [fetchFoodList]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      console.log("Token stored in localStorage:", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Очистка устаревшего кэша при монтировании
  useEffect(() => {
    const cleanupCache = () => {
      const cachedData = localStorage.getItem(FOOD_LIST_CACHE_KEY);
      if (cachedData) {
        const { timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp > CACHE_DURATION) {
          localStorage.removeItem(FOOD_LIST_CACHE_KEY);
        }
      }
    };
    
    cleanupCache();
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
    logout,
    refreshData, // Добавляем функцию обновления данных в контекст
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
