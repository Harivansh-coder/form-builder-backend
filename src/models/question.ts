import mongoose, { Schema, model, Document } from "mongoose";

const QuestionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Categorize", "Cloze", "Comprehension"],
      required: true,
    },
    question: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true }, // Flexible for different question types
    points: { type: Number, default: 0 },
    feedback: { type: String },
    form: { type: Schema.Types.ObjectId, ref: "Form" }, // Reference to the form
  },
  { timestamps: true }
);

export interface IQuestion extends Document {
  type: string;
  question: string;
  data: any;
  points: number;
  feedback?: string;
  form: string;
}

const Question =
  (mongoose.models.Question as mongoose.Model<IQuestion>) ||
  model<IQuestion>("Question", QuestionSchema);

export default Question;
