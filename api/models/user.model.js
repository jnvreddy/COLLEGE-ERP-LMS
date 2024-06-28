
//api/models/user.model.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
      default: 'admin', // Default role can be anything you choose
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
