import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    hour: { type: Number, required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    students: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
        present: { type: Boolean, required: true },
      },
    ],
  },
  { timestamps: true }
);

const AttendanceModel = mongoose.model('Attendance', attendanceSchema);

export default AttendanceModel;
