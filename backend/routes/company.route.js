import express from "express";
import {
  addCompany,
  getallCompany,
  getCompanybyId,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/companies", getallCompany);
router.get("/companies/:id", getCompanybyId);
router.post("/company/add", addCompany);

export default router;
