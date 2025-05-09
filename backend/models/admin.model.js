import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin Details", adminSchema);
export default Admin;
