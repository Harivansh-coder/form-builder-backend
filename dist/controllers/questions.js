"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestionController = exports.updateQuestionController = exports.getAllQuestionsController = exports.addQuestionController = void 0;
// contains all controller for question route handlers. The controller functions are the logic that is executed when a request is made to the server. The controller functions are exported and imported into the route handlers in the routes file. This separation of concerns makes the code more modular and easier to maintain.
const form_1 = __importDefault(require("../models/form"));
const question_1 = __importDefault(require("../models/question"));
// add a question to a form
const addQuestionController = async (req, res) => {
    const { type, question, data, points, feedback } = req.body;
    try {
        const formId = req.params.formId;
        const form = await form_1.default.findById(formId);
        if (!form) {
            res.status(404).json({ error: "Form not found" });
            return;
        }
        const newQuestion = await question_1.default.create({
            type,
            question,
            data,
            points,
            feedback,
            form: form._id,
        });
        form.questions.push(newQuestion._id);
        await form.save();
        res.status(201).json(newQuestion);
    }
    catch (error) {
        res.status(500).json({ error: "Error adding question to form" });
    }
};
exports.addQuestionController = addQuestionController;
// get all questions for a form
const getAllQuestionsController = async (req, res) => {
    try {
        const formId = req.params.formId;
        const questions = await question_1.default.find({ form: formId });
        res.json(questions);
    }
    catch (error) {
        res.status(500).json({ error: "Error getting questions" });
    }
};
exports.getAllQuestionsController = getAllQuestionsController;
// update a question for a form
const updateQuestionController = async (req, res) => {
    try {
        const question = await question_1.default.findByIdAndUpdate(req.params.questionId, req.body, { new: true, runValidators: true });
        if (!question) {
            res.status(404).json({ error: "Question not found" });
            return;
        }
        res.json(question);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating question" });
    }
};
exports.updateQuestionController = updateQuestionController;
// delete a question for a form
const deleteQuestionController = async (req, res) => {
    try {
        // get current question by id
        const question = await question_1.default.findByIdAndDelete(req.params.questionId);
        // if question does not exist
        if (!question) {
            res.status(404).json({ error: "Question not found" });
            return;
        }
        // remove question from form
        await form_1.default.updateOne({ _id: question.form }, { $pull: { questions: question._id } });
        res.json({
            message: "Question deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting question" });
    }
};
exports.deleteQuestionController = deleteQuestionController;
