import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://fweb:Ga8dHNgC@cluster0.7vaak.mongodb.net/food-del?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("DB Connected"))
    .catch((error) => console.error("DB connection error:", error));
};
