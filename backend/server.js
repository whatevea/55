import express from 'express'
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import connectDB from './connect/database.js';
import cors from 'cors';
dotenv.config();
connectDB()
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Routes
app.use('/auth', authRoutes)
//test
app.get('/test', (req, res) => {
    res.send('This is route 1');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Backend is running on http://127.0.0.1:' + port);
});



