import express from 'express';
import addJob, { getJobsList, getSingleJobPost } from "../controllers/hirerController.js"

const router = express.Router();
router.post('/postJob', addJob)
router.get('/postJob', getJobsList)
router.get('/singleJobPost/:id', getSingleJobPost)
export default router;