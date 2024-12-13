"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const forms_1 = require("../controllers/forms");
const formRouter = express_1.default.Router();
// create a new form route
formRouter.post("/", forms_1.createFormController);
// get all forms or a single form
formRouter.get("/:id?", forms_1.getFormsController);
// update a form
formRouter.patch("/:id", forms_1.updateFormController);
// delete a form
formRouter.delete("/:id", forms_1.deleteFormController);
exports.default = formRouter;
