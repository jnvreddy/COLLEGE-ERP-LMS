import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    year: { type: Number, required: true },
    semester: { type: Number, required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  },
  { timestamps: true }
);

const SubjectModel = mongoose.model('Subject', subjectSchema);

export default SubjectModel;

