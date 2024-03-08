import express from 'express';
import { getSelfAppliedJobs, getFilteredJobs } from '../controllers/freelancerController.js';
const router = express.Router();
router.post('/getSelfAppliedJobs', getSelfAppliedJobs)
router.get('/getFilteredJobs', getFilteredJobs)
export default router;