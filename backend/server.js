import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import companyRoutes from "./routes/company.route.js";
import connectDb from "./dababase/db.js";
import adminRoute from "./routes/admin.route.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/api", companyRoutes);
app.use("/api", adminRoute);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Something went wrong", error);
    process.exit(1);
  }
};

startServer();
