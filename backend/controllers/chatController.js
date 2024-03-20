import asyncHandler from 'express-async-handler';
import Communication_Messages from '../models/communication_messages.js';

export const contactChat = asyncHandler(async (req, res) => {

})

export const fetchChats = asyncHandler(async (req, res) => {

    console.log('we are here in fetchChats');
    const userId = req.params.userId;

    console.log('userId is', userId);

    try {
        // Retrieve chats where receiver_id is equal to userId
        const chats = await Communication_Messages.find({ receiver_id: userId });

        console.log('chats are', chats);

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})