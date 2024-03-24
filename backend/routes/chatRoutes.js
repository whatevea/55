import express from 'express';
import { contactChat, fetchChats, conversationRoom } from "../controllers/chatController.js"


const router = express.Router();
router.get('/fetchChats/:userId', fetchChats)
router.post('/conversationRoom', conversationRoom)

export default router;
