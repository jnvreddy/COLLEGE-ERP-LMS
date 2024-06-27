// api/models/faculty.model.js
import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    facultyid: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['faculty'],
      default: 'faculty',
    },
  },
  { timestamps: true }
);

const FacultyModel = mongoose.model('FacultyModel', facultySchema);

export default FacultyModel;
