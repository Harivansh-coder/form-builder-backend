import express from "express";
import {
  createFormController,
  deleteFormController,
  getFormsController,
  updateFormController,
} from "@/controllers/forms";

const formRouter = express.Router();

// create a new form route
formRouter.post("/", createFormController);
// get all forms or a single form
formRouter.get("/:id?", getFormsController);

// update a form
formRouter.patch("/:id", updateFormController);

// delete a form
formRouter.delete("/:id", deleteFormController);

export default formRouter;
