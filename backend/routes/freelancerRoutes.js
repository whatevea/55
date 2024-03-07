import express from 'express';
import { getSelfAppliedJobs } from '../controllers/freelancerController.js';
const router = express.Router();
router.post('/getSelfAppliedJobs', getSelfAppliedJobs)
export default router;