import express from 'express';
import addJob from "../controllers/hirerController.js"
const router = express.Router();
router.post('/postJob', addJob)
export default router;