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
    console.log('user is', user)
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id, email: user.email, fname: user.fname, lname: user.lname, token: generateJWTtoken(user._id), user_type: user.user_type
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
});

const getUserData = asyncHandler(async (req, res) => {
    console.log('we are getting you a user data')
    const user_id = req.params.userId;  // Use req.params to get URL parameters
    const user = await User.findById(user_id);
    console.log('user is', user)
    res.status(200).json({
        success: true,
        data: user,
    });
})

const updateUser = asyncHandler(async (req, res) => {
    console.log('we got called here to the updateUser');
    console.log('req.body is', req.body);
    const { email, fname, lname, newPassword, password, user_type, bio, _id } = req.body

    // Step 1: Verify the current password
    const user = await User.findById(_id);
    console.log('user data into the database is', user);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: 'Incorrect password',
        });
    }

    // Step 2: Update user data, including the password if a new password is provided
    const updatedUserData = {
        email,
        fname,
        lname,
        user_type,
        bio
    };

    if (newPassword) {
        // Hash the new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        updatedUserData.password = hashedPassword;
    }

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(_id, updatedUserData, { new: true });

    res.status(200).json({
        success: true,
        data: updatedUser,
    });


})

const getBulkUserData = asyncHandler(async (req, res) => {
    const freelancers = await User.find({ user_type: 'freelancer' });

    res.status(200).json({
        success: true,
        data: freelancers,
    });
})

export { registerUser, loginUser, getUserData, updateUser, getBulkUserData };
