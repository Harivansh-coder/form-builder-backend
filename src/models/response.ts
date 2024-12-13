import mongoose, { Schema, model, Document } from "mongoose";

const ResponseSchema = new Schema(
  {
    form: { type: Schema.Types.ObjectId, ref: "Form", required: true },
    responses: [
      {
        question: { type: Schema.Types.ObjectId, ref: "Question" },
        answer: Schema.Types.Mixed, // Flexible for different response types
      },
    ],
    userId: { type: String },
  },
  { timestamps: true }
);

export interface IResponse extends Document {
  form: string;
  responses: { question: string; answer: any }[];
  userId: string;
}

const FormResponse =
  (mongoose.models.Response as mongoose.Model<IResponse>) ||
  model<IResponse>("Response", ResponseSchema);

export default FormResponse;
