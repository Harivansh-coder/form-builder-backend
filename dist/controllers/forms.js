"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFormController = exports.updateFormController = exports.getFormsController = exports.createFormController = void 0;
// contains contollers for form routes
const form_1 = __importDefault(require("../models/form"));
const question_1 = __importDefault(require("../models/question"));
// create a new form
const createFormController = async (req, res) => {
    try {
        const { title, description, headerImage } = req.body;
        const form = new form_1.default({ title, description, headerImage });
        await form.save();
        res.status(201).json(form);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating form" });
    }
};
exports.createFormController = createFormController;
// get all forms
const getFormsController = async (req, res) => {
    try {
        const { id: formID } = req.params;
        if (formID) {
            const form = await form_1.default.findById(formID).populate("questions");
            if (!form) {
                res.status(404).json({ error: "Form not found" });
                return;
            }
            res.status(200).json(form);
            return;
        }
        const forms = await form_1.default.find().populate("questions");
        res.status(200).json(forms);
    }
    catch (error) {
        console.error("Error getting forms:", error); // Optional logging for debugging
        res.status(500).json({ error: "Error getting forms" });
    }
};
exports.getFormsController = getFormsController;
// update a form
const updateFormController = async (req, res) => {
    try {
        const formID = req.params.id;
        const { title, description, headerImage } = req.body;
        const updatedForm = await form_1.default.findByIdAndUpdate(formID, { title, description, headerImage }, { new: true });
        if (!updatedForm) {
            res.status(404).json({ error: "Form not found" });
            return;
        }
        res.status(200).json(updatedForm);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating form" });
    }
};
exports.updateFormController = updateFormController;
// delete a form
const deleteFormController = async (req, res) => {
    try {
        const formID = req.params.id;
        // Use findByIdAndDelete directly; it will return the deleted form or null
        const form = await form_1.default.findByIdAndDelete(formID);
        if (!form) {
            res.status(404).json({ error: "Form not found" });
            return;
        }
        // delete all questions associated with the form
        await question_1.default.deleteMany({ form: formID });
        res.status(204).send(); // 204 No Content, no body is needed
    }
    catch (error) {
        console.error("Error deleting form:", error); // Optional logging for debugging
        res.status(500).json({ error: "Error deleting form" });
    }
};
exports.deleteFormController = deleteFormController;
