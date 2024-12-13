// contains all controller for question route handlers. The controller functions are the logic that is executed when a request is made to the server. The controller functions are exported and imported into the route handlers in the routes file. This separation of concerns makes the code more modular and easier to maintain.
import Form from "@/models/form";
import Question from "@/models/question";
import { Request, Response, RequestHandler } from "express";

// add a question to a form
export const addQuestionController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { type, question, data, points, feedback } = req.body;

  try {
    const formId = req.params.formId;

    const form = await Form.findById(formId);

    if (!form) {
      res.status(404).json({ error: "Form not found" });
      return;
    }

    const newQuestion = await Question.create({
      type,
      question,
      data,
      points,
      feedback,
      form: form._id,
    });

    form.questions.push(newQuestion._id as string);
    await form.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: "Error adding question to form" });
  }
};

// get all questions for a form
export const getAllQuestionsController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const formId = req.params.formId;

    const questions = await Question.find({ form: formId });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Error getting questions" });
  }
};

// update a question for a form
export const updateQuestionController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.questionId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!question) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({ error: "Error updating question" });
  }
};

// delete a question for a form
export const deleteQuestionController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    // get current question by id
    const question = await Question.findByIdAndDelete(req.params.questionId);

    // if question does not exist
    if (!question) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    // remove question from form
    await Form.updateOne(
      { _id: question.form },
      { $pull: { questions: question._id } }
    );

    res.json({
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error deleting question" });
  }
};
