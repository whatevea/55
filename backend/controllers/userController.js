import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'

const registerUser = asyncHandler(async (req, res) => {
    console.log('we are registering user')
    const { user_name, email, fname, lname, password, user_type } = req.body

    if (!user_name || !email || !password || !fname || !lname || !user_type) {
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
    const user = await User.create({ user_name, email, fname, password: hashedPassword })
    if (user) {
        res.status(201).json({ _id: user.id, username: user.user_name, email: user.email, fname: user.fname })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    console.log('user details: ', user)
    if (user && (await bcrypt.compare(password, user.password))) {
        let userDetails = { _id: user.id, user_name: user.user_name, email: user.email, fname: user.fname }
        const session = jwt.sign(userDetails, process.env.JWT_SECRET, {
            expiresIn: parseInt(process.env.EXPIRE_IN) || 86400,
        });
        // Send response with token
        res.json({
            session,
            message: "User logged in Successfully!",
            userDetails: userDetails,
        });
    } else {
        res.status(400)
        throw new Error('Invalid Data')
    }

});

export { registerUser, loginUser };
