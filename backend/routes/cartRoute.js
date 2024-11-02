import express from "express";
import { addTOCart, removeFromCart, getCart } from "../controllers/cartController.js"; // Ensure the file name is correct
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addTOCart);

cartRouter.post("/remove", authMiddleware, removeFromCart);

cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;
