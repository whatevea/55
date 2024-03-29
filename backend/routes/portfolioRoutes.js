import express from "express";
import { addPortfolio } from "../controllers/portfolioController.js";

const router = express.Router();
router.post("/submit-portfolio", addPortfolio);

export default router;
