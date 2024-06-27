// api/models/student.model.js
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    registernumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student'],
      default: 'student',
    },
    department: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StudentModel = mongoose.model('StudentModel', studentSchema);

export default StudentModel;
