import express from 'express';
import addJob, { getJobsList } from "../controllers/hirerController.js"

const router = express.Router();
router.post('/postJob', addJob)
router.get('/postJob', getJobsList)
export default router;