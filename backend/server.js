import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import companyRoutes from "./routes/company.route.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/api", companyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
