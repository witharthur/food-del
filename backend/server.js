import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";


dotenv.config();

const app = express();
const port = 4000;


app.use(express.json());
app.use(cors());

// Database connection
connectDB();

//api
app.use(express.json());
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/images", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("API Working");
});

app
  .listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("Server error:", err);
    process.exit(1); // Exit process with failure
  });
