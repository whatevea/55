import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'; // Added missing import
import multer from 'multer';
import authRoutes from './routes/authRoutes.js';
import hireRoutes from "./routes/hireRoutes.js";
import connectDB from './connect/database.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define storage for multer before initializing the upload variable
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure this folder exists in your project directory.
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', authRoutes);
app.use("/hire", hireRoutes);

app.get('/test', (req, res) => {
    res.send('This is route 1');
});

app.post('/upload', upload.single('file'), (req, res) => {
    // Assuming you're hosting files publicly in a folder accessible through a static route
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.send({ fileUrl });
});

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Backend is running on http://127.0.0.1:${port}`);
});
