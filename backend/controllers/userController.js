import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import dotenv from 'dotenv';
dotenv.config();

const generateJWTtoken = id => jwt.sign({ id }, process.env.JWT_secret, { expiresIn: '5d' })

const registerUser = asyncHandler(async (req, res) => {
    const { email, fname, lname, password, user_type } = req.body

    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400);
        throw new Error('Invalid email format');
    }

    if (!email || !password || !fname || !lname || !user_type) {
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User Exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({ email, fname, lname, password: hashedPassword, user_type })
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email, fname: user.fname, lname: user.lname })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id, email: user.email, fname: user.fname, token: generateJWTtoken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
});

export { registerUser, loginUser };
