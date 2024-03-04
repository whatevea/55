import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import connectDB from './connect/database.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import hireRoutes from "./routes/hireRoutes.js"
import multer from 'multer';
dotenv.config();
connectDB()
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Routes
app.use('/auth', authRoutes)
app.use("/hire", hireRoutes)
app.get('/test', (req, res) => {
    res.send('This is route 1');
});
const upload = multer({ storage: storage });
app.use(errorHandler);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure this folder exists in your project directory.
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const port = process.env.PORT || 5000;
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    res.send('File uploaded successfully.');
});
app.listen(port, () => {
    console.log('Backend is running on http://127.0.0.1:' + port);
});



