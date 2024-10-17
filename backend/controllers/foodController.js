import foodModel from "../models/foodModel.js";

import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add Food Handler
const addFood = async (req, res) => {
  try {
    // Use req.file.filename to get the uploaded file name
    let image_filename = req.file.filename;

    // Create a new food document
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    // Save the food document to the database
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding food" });
  }
};

// List Food Handler
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching foods" });
  }
};

// Remove Food Handler
const removeFood = async (req, res) => {
  try {
    const foodId = req.body.id; // Получаем ID из тела запроса
    console.log("Received ID:", foodId);

    const food = await foodModel.findById(foodId);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    const imagePath = path.join(__dirname, "../uploads", food.image);
    console.log("Image path:", imagePath);

    // Удаляем изображение
    await fs.promises.unlink(imagePath);

    // Удаляем элемент из базы данных
    await foodModel.findByIdAndDelete(foodId);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log("Error occurred while removing food:", error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};

export { addFood, listFood, removeFood };
