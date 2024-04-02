import express from "express";
import {
  addPortfolio,
  getPortfolio,
} from "../controllers/portfolioController.js";

const router = express.Router();
router.get("/get-portfolio/:userId", getPortfolio);

export default router;
