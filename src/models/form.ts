import mongoose, { Schema, model, Document } from "mongoose";

const FormSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  headerImage: {
    type: String,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

export interface IForm extends Document {
  title: string;
  description?: string;
  headerImage?: string;
  questions: string[];
}

const Form =
  (mongoose.models.Form as mongoose.Model<IForm>) ||
  model<IForm>("Form", FormSchema);

export default Form;
