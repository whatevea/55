import express from 'express';
import { contactChat, fetchChats } from "../controllers/chatController.js"


const router = express.Router();
router.get('/fetchChats/:userId', fetchChats)

export default router;
