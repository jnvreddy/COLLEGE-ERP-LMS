import AttendanceModel from '../models/attendance.model.js';
import StudentModel from '../models/student.model.js';

export const markAttendance = async (req, res) => {
  const { date, hour, subjectId, facultyId, students } = req.body;

  try {
    const newAttendance = new AttendanceModel({
      date,
      hour,
      subject: subjectId,
      faculty: facultyId,
      students,
    });

    await newAttendance.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAttendance = async (req, res) => {
  const { subjectId, date } = req.params;

  try {
    const attendance = await AttendanceModel.find({ subject: subjectId, date });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
