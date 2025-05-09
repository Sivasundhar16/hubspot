import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });

    console.log("✅ MongoDB connected");

    await Admin.deleteMany();

    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Insert new admin
    const admin = await Admin.create({
      email: "admin@example.com",
      password: hashedPassword,
    });

    console.log("✅ Admin seeded:", admin);
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedAdmin();
