"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../controllers/response");
const express_1 = __importDefault(require("express"));
const responseRouter = express_1.default.Router();
// submit a response to a form
responseRouter.post("/:formId", response_1.submitResponseController);
// get all responses for a form
responseRouter.get("/:responseId", response_1.getResponsesController);
// delete all responses for a form
responseRouter.delete("/:responseId", response_1.deleteResponsesController);
exports.default = responseRouter;
