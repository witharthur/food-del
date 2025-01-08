import foodModel from "../models/foodModel.js";
import fs from "fs/promises";
import path from "path";

// Simplified and cleaned up addFood function
const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image_filename = req.file.filename;

    const food = new foodModel({
      name, description, price, category, image: image_filename
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

// Simplified listFood function
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching foods" });
  }
};

// Simplified removeFood function
const removeFood = async (req, res) => {
  try {
    const { id: foodId } = req.body;

    const food = await foodModel.findById(foodId);
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });

    const imagePath = path.join(import.meta.url, "../uploads", food.image);
    await fs.unlink(imagePath);

    await foodModel.findByIdAndDelete(foodId);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};

export { addFood, listFood, removeFood };
