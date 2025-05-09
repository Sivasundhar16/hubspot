import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const singUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Enter Email and Password" });
    }

    const Existinguser = await Admin.findOne(email);
    if (Existinguser) {
      return res.status(401).json({ message: "User Already Exist" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Enter Minimam 6 Character" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = bcrypt.hash(password, salt);

    const admin = new Admin({
      email: email,
      password: hashedPassword,
    });

    await admin.save();

    //token creation

    const token = jwt.sign(
      { adminId: admin._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("Admin_cookie", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({ message: "Admin register Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Enter the all the fields" });
  }

  const Existinguser = await Admin.findOne(email);

  if (!Existinguser) {
    res.status(404).json({ message: "User Not found" });
  }
};
