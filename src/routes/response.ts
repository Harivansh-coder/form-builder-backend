import {
  deleteResponsesController,
  getResponsesController,
  submitResponseController,
} from "@/controllers/response";
import express from "express";

const responseRouter = express.Router();

// submit a response to a form
responseRouter.post("/:formId", submitResponseController);

// get all responses for a form
responseRouter.get("/:responseId", getResponsesController);

// delete all responses for a form
responseRouter.delete("/:responseId", deleteResponsesController);

export default responseRouter;
