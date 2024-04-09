import asyncHandler from "express-async-handler";
import Communication_Messages from "../models/communication_messages.js";
import Conversation from "../models/conversation.js";

export const contactChat = asyncHandler(async (req, res) => {});

export const fetchChats = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  try {
    // Retrieve chats where senderData or receiverData contains userId
    const chats = await Communication_Messages.find({
      $or: [{ "receiverData._id": userId }],
    });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export const conversationRoom = asyncHandler(async (req, res) => {
  const { users } = req.body;

  try {
    const roomId = users;

    // users need to be saved into the database into Conversation model
    const conversation = new Conversation({
      users: users,
    });

    await conversation.save();
    // Send a success response with the conversation room data
    res.status(200).json({
      success: true,
      message: "Conversation room created successfully",
      conversation: conversation,
    });
  } catch (error) {
    // If an error occurs, send a 500 internal server error response
    console.error("Error creating conversation room:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
