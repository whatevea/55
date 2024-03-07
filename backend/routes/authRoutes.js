import express from 'express';
import { registerUser, loginUser, getUserData, updateUser, getBulkUserData } from '../controllers/userController.js';
const router = express.Router();
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUserData/:userId', getUserData)
router.get('/getBulkUserData', getBulkUserData)
router.put('/updateUser', updateUser)
export default router;