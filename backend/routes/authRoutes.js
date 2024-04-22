import express from "express";
import passport from "passport";
import {
  registerUser,
  loginUser,
  getUserData,
  updateUser,
  getBulkUserData,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authUser.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUserData/:userId", authenticate, getUserData);
router.get("/getBulkUserData", authenticate, getBulkUserData);
router.put("/updateUser", authenticate, updateUser);
export default router;
