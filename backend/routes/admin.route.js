import express from "express";
import { login, singUp } from "../controller/admin.controleller.js";

const router = express.Router();

router.post("/signup", singUp);
router.post("/login", login);

export default router;
