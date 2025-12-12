import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/watn");
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB Error:", err);
    process.exit(1);
  }
};
