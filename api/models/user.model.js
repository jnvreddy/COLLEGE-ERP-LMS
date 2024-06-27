<<<<<<< HEAD
=======
//api/models/user.model.js
>>>>>>> b57ab5b (admin home page and funcunality to add users by admin in progress)
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
      default: 'student', // Default role can be anything you choose
    },
<<<<<<< HEAD
    profilePicture: {
      type: String,
      default: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
=======
>>>>>>> b57ab5b (admin home page and funcunality to add users by admin in progress)
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
