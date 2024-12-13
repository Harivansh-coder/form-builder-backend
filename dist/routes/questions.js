"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const questions_1 = require("../controllers/questions");
const express_1 = __importDefault(require("express"));
const questionRouter = express_1.default.Router();
// add a question to a form
questionRouter.post("/:formId", questions_1.addQuestionController);
// get all questions for a form
questionRouter.get("/:formId", questions_1.getAllQuestionsController);
// update a question for a form
questionRouter.patch("/:questionId", questions_1.updateQuestionController);
// delete a question for a form
questionRouter.delete("/:questionId", questions_1.deleteQuestionController);
exports.default = questionRouter;
