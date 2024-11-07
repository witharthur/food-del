import foodModel from "../models/foodModel.js";

import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addFood = async (req, res) => {
  try {
    let image_filename = req.file.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding food" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching foods" });
  }
};

const removeFood = async (req, res) => {
  try {
    const foodId = req.body.id;
    console.log("Received ID:", foodId);

    const food = await foodModel.findById(foodId);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    const imagePath = path.join(__dirname, "../uploads", food.image);
    console.log("Image path:", imagePath);

    await fs.promises.unlink(imagePath);

    await foodModel.findByIdAndDelete(foodId);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log("Error occurred while removing food:", error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};

export { addFood, listFood, removeFood };
