import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log("Database connected successfully:", connection.connection.host);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDb;
