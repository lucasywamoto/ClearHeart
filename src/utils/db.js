import mongoose from "mongoose";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(String(process.env.MONGODB_URI));
    return conn;
  } catch (error) {
    throw new Error(error);
  }
}
