import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

// Replace 'menu_items' with your desired collection name
const foodModel = mongoose.models.food || mongoose.model("foods", foodSchema);

export default foodModel;