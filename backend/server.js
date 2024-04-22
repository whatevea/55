import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import http from "http"; // Import the HTTP module
import ChatMessages from "./models/communication_messages.js";
import { initialize, authenticate } from "./middleware/authUser.js";
import Portfolio from "./models/portfolio.js";
import { Server } from "socket.io"; // Import Socket.IO

// Routes imports
import authRoutes from "./routes/authRoutes.js";
import hireRoutes from "./routes/hireRoutes.js";
import freelancerRoutes from "./routes/freelancerRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import contractRoutes from "./routes/contractRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import "./service/userAuth.js"; // Import the user authentication module

// Middleware and DB connection imports
import { errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./connect/database.js";
import { log } from "console";

dotenv.config(); // Load environment variables
connectDB(); // Establish database connection

const app = express(); // Initialize express app
const server = http.createServer(app); // Create HTTP server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
}); // Create Socket.IO instance

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Support JSON-encoded bodies
app.use(express.urlencoded({ extended: false })); // Support URL-encoded bodies
app.use(initialize());

// Serve the uploads folder statically
const uploadsDir = path.resolve("uploads");
app.use("/uploads", express.static(uploadsDir));

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this folder exists in your project directory
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

// Routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/hire", hireRoutes); // Hiring-related routes
app.use("/freelancer", freelancerRoutes);
app.use("/chats", chatRoutes);
app.use("/contract", contractRoutes);
app.use("/portfolio", portfolioRoutes);
// Test route
app.get("/test", (req, res) => {
  res.send("This is route 1");
});

// File upload route
app.post("/upload", authenticate, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }

  // Construct the file URL
  const fileUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${
    req.file.filename
  }`;

  // Set the Content-Disposition header to force download
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${req.file.filename}`
  );

  res.json({
    message: "File uploaded successfully.",
    fileUrl: fileUrl, // Send the file URL in the response
  });
});

// Portfolio Submission
// Route for handling portfolio submission with image upload
app.post(
  "/portfolio/submit-portfolio",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    console.log(
      "we are inside /portfolio/submit-portfolio and req.body is",
      req.body
    );

    try {
      const { link, description, userId } = req.body;
      const imageFilename = req.file ? req.file.filename : null;

      // Construct the image URL based on where your images are stored
      const imageUrl = `http://localhost:${
        process.env.PORT || 5000
      }/uploads/${imageFilename}`;

      // Save the portfolio data (link, description, and image filename) to your database
      const newPortfolio = new Portfolio({
        imageLink: imageUrl,
        websiteLink: link,
        description: description,
        userId: userId,
      });

      await newPortfolio.save();

      res.status(200).json({ message: "Portfolio submitted successfully" });
    } catch (error) {
      console.error("Error submitting portfolio:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
);

// Error handling middleware
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", (contractId) => {
    console.log("contractId is", contractId);
    socket.join(contractId);
    console.log(`User with id ${socket.id} joined room ${contractId}`);
    socket.to(contractId).emit("userJoined", { userId: socket.id });
  });

  socket.on("chatMessage", async (obj) => {
    console.log("obj is", obj);
    try {
      // Save the chat message to the database
      const newChatMessage = new ChatMessages({
        message: obj.message,
        senderId: obj.senderId,
        receiverId: obj.receiverId,
        roomId: obj.roomId,
      });
      await newChatMessage.save();

      // Emit the chat message to the private room
      socket.to(obj.roomId).emit("message-received", obj);
    } catch (error) {
      console.error("Error saving chat message:", error);
    }
  });

  socket.on("disconnection", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
