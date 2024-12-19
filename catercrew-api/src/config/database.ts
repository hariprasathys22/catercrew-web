import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("Mongo URI is not defined");
    }

    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (e) {
    console.error(e, "Databasse not connected");
    process.exit(1);
  }
};
export default connectDB;
