import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Orders.css";
import { toast } from "react-toastify";
import { assets } from "../../src/assets/assets";

const fetchAllOrders = async (url) => {
  try {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      return response.data.data;
    } else {
      toast.error("Error fetching orders");
      return [];
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    toast.error("Error fetching orders");
    return [];
  }
};

const statusHendler = async (event, orderId, backendUrl, setOrders) => {
  console.log(event, orderId);

  const response = await axios.post(backendUrl + "/api/order/status", {
    orderId,
    status: event.target.value,
  });

  if (response.data.success) {
    const allOrders = await fetchAllOrders(backendUrl);
    setOrders(allOrders);
  } else {
    toast.error("Error updating order status");
  }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const backendUrl = "https://food-del-t1rl.onrender.com";
  useEffect(() => {
    const getAllOrders = async () => {
      const allOrders = await fetchAllOrders(backendUrl);
      setOrders(allOrders);
    };
    getAllOrders();
  }, [backendUrl]);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={assets.box_order} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>
              Total Amount: $
              {order.items
                ? order.items.reduce(
                    (total, item) =>
                      total + (item.price || 0) * (item.quantity || 0),
                    0
                  )
                : 0}
            </p>{" "}
            <select
              onChange={(event) =>
                statusHendler(event, order._id, backendUrl, setOrders)
              }
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
