import mongoose from "mongoose";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(String(process.env.MONGODB_URI), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return conn;
  } catch (error) {
    throw new Error(error);
  }
}
