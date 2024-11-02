import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:4000";

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    console.log("Attempting to remove food with ID:", foodId);
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });

      if (response.data.success) {
        toast.success("Food item removed successfully");
        fetchList();
      } else {
        toast.error("Error deleting food item");
      }
    } catch (error) {
      console.error(
        "Error occurred while deleting food:",
        error.response?.data || error.message
      );
      toast.error(
        `Error deleting food: ${error.response?.data?.message || error.message}`
      );
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img
              src={`${url}/images/${item.image}`}
              alt={item.name}
              className="food-image"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
