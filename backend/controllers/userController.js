import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

import dotenv from "dotenv";
dotenv.config();

const generateJWTtoken = (id) =>
  jwt.sign({ id }, process.env.JWT_secret, { expiresIn: "5d" });

const registerUser = asyncHandler(async (req, res) => {
  const { email, fname, lname, password } = req.body;

  // Check for valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email format");
  }

  if (!email || !password || !fname || !lname) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Email Already Exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    email,
    fname,
    lname,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      fname: user.fname,
      lname: user.lname,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      email: user.email,
      fname: user.fname,
      lname: user.lname,
      token: generateJWTtoken(user._id),
      // user_type: user.user_type,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const getUserData = asyncHandler(async (req, res) => {
  const user_id = req.params.userId; // Use req.params to get URL parameters
  const user = await User.findById(user_id);

  // Exclude the password property from the user object
  const { password, ...userData } = user.toObject();

  res.status(200).json({
    success: true,
    data: userData,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const {
    email,
    fname,
    lname,
    newPassword,
    confirmNewPassword,
    password,
    user_type,
    bio,
    _id,
    skills,
  } = req.body;

  // Step 1: Verify the current password
  const user = await User.findById(_id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (password) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
  }

  // Check if newPassword and confirmNewPassword are the same
  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({
      success: false,
      message: "New password and confirm password do not match",
    });
  }

  // Step 2: Update user data, including the password if a new password is provided
  const updatedUserData = {
    email,
    fname,
    lname,
    user_type,
    bio,
    skills,
  };

  if (newPassword && newPassword !== "") {
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    updatedUserData.password = hashedPassword;
  } else {
    // Remove password field from update data if no new password provided
    delete updatedUserData.password;
  }

  // Update the user in the database
  const updatedUser = await User.findByIdAndUpdate(_id, updatedUserData, {
    new: true,
  });

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

const getBulkUserData = asyncHandler(async (req, res) => {
  const freelancers = await User.find(
    { user_type: "freelancer" },
    { password: 0 }
  );

  res.status(200).json({
    success: true,
    data: freelancers,
  });
});

export { registerUser, loginUser, getUserData, updateUser, getBulkUserData };
