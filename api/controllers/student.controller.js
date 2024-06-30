import StudentModel from '../models/student.model.js';

export const getStudentsByYear = async (req, res) => {
  const { year } = req.params;

  try {
    const students = await StudentModel.find({ year: parseInt(year) });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
