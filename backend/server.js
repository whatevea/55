import express from 'express'
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import connectDB from './connect/database.js';


dotenv.config();
connectDB()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/auth/users', authRoutes)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Backend is running on http://127.0.0.1:' + port);
});



