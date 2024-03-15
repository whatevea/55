import express from 'express';
import { contactChat, fetchChats } from "../controllers/chatController.js"


const router = express.Router();
router.post('/contactChat', contactChat)
// router.get('/fetchChats', fetchChats)

export default router;
