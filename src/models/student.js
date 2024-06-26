import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    rollNo: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Students", studentSchema);

export default Student;