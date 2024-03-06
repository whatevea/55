import express from 'express';
import { registerUser, loginUser, getUserData, updateUser } from '../controllers/userController.js';
const router = express.Router();
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUserData/:userId', getUserData)
router.put('/updateUser', updateUser)
export default router;