import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

// Routes imports
import authRoutes from './routes/authRoutes.js';
import hireRoutes from "./routes/hireRoutes.js";
import freelancerRoutes from "./routes/freelancerRoutes.js";

// Middleware and DB connection imports
import { errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './connect/database.js';

dotenv.config(); // Load environment variables
connectDB(); // Establish database connection

const app = express(); // Initialize express app

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Support JSON-encoded bodies
app.use(express.urlencoded({ extended: false })); // Support URL-encoded bodies

// Serve the uploads folder statically
const uploadsDir = path.resolve('uploads');
app.use('/uploads', express.static(uploadsDir));

// Define storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this folder exists in your project directory
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

// Routes
app.use('/auth', authRoutes); // Authentication routes
app.use("/hire", hireRoutes); // Hiring-related routes
app.use("/freelancer", freelancerRoutes);

// Test route
app.get('/test', (req, res) => {
    res.send('This is route 1');
});

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    // Construct the file URL
    const fileUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;

    // Set the Content-Disposition header to force download
    res.setHeader('Content-Disposition', `attachment; filename=${req.file.filename}`);

    res.json({
        message: 'File uploaded successfully.',
        fileUrl: fileUrl // Send the file URL in the response
    });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Backend is running on http://127.0.0.1:${port}`);
});