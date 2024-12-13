import {
  addQuestionController,
  deleteQuestionController,
  getAllQuestionsController,
  updateQuestionController,
} from "@/controllers/questions";
import express from "express";

const questionRouter = express.Router();

// add a question to a form
questionRouter.post("/:formId", addQuestionController);

// get all questions for a form
questionRouter.get("/:formId", getAllQuestionsController);

// update a question for a form
questionRouter.patch("/:questionId", updateQuestionController);

// delete a question for a form
questionRouter.delete("/:questionId", deleteQuestionController);

export default questionRouter;
