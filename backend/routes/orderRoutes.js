import express from "express";
import passport from "passport";
import { initialize, authenticate } from "../middleware/authUser.js";
import { placeOrder } from "../controllers/orderController.js";

const router = express.Router();
router.use(passport.initialize());

router.post("/place-order", authenticate, placeOrder);

export default router;
