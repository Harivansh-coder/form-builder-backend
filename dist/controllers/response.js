"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResponsesController = exports.getResponsesController = exports.submitResponseController = void 0;
const response_1 = __importDefault(require("../models/response"));
const submitResponseController = async (req, res) => {
    try {
        const formId = req.params.formId;
        const { response, userId } = req.body;
        const newResponse = await response_1.default.create({
            form: formId,
            responses: response,
            userId,
        });
        res.status(201).json(newResponse);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to submit response" });
    }
};
exports.submitResponseController = submitResponseController;
// get all responses for a form
const getResponsesController = async (req, res) => {
    try {
        const formId = req.params.formId;
        const responses = await response_1.default.find({ form: formId });
        res.status(200).json(responses);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get responses" });
    }
};
exports.getResponsesController = getResponsesController;
// delete all responses for a form
const deleteResponsesController = async (req, res) => {
    try {
        const formId = req.params.formId;
        // if formId is not provided, delete all responses
        if (!formId) {
            await response_1.default.deleteMany({});
        }
        else {
            const forms = await response_1.default.findByIdAndDelete(formId);
            if (!forms) {
                res.status(404).json({ message: "Form not found" });
                return;
            }
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete responses" });
    }
};
exports.deleteResponsesController = deleteResponsesController;
