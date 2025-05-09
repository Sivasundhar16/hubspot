import express from "express";
import {
  addCompany,
  getallCompany,
  getCompanybyId,
  nextPage,
} from "../controller/company.controller.js";

const router = express.Router();

router.get("/companies", getallCompany);
router.get("/companies/next", nextPage);
router.get("/companies/:id", getCompanybyId);
router.post("/company/add", addCompany);

export default router;
